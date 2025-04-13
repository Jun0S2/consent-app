const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os"); // 운영체제 감지용

const sdkPath = "C:\\\\Users\\\\hp000\\\\AppData\\\\Local\\\\Android\\\\Sdk";
const localPropsPath = path.join(__dirname, "../android/local.properties");
const fixJavaScript = path.join(__dirname, "fixJavaVersion.js");
const buildGradlePath = path.join(__dirname, "../android/app/build.gradle");

function run(cmd, cwd = process.cwd()) {
  console.log(`\n▶ Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit", shell: true, cwd });
}

function getVersionInfo() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  const yyyy = now.getFullYear();
  const MM = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  const versionCode = parseInt(`${MM}${dd}${hh}${mm}`);
  const versionName = `${yyyy}.${MM}.${dd}-${hh}${mm}${ss}`;

  return { versionCode, versionName };
}

function patchBuildGradle() {
  const { versionCode, versionName } = getVersionInfo();

  if (!fs.existsSync(buildGradlePath)) {
    console.error("❌ build.gradle not found");
    process.exit(1);
  }

  let content = fs.readFileSync(buildGradlePath, "utf8");

  content = content
    .replace(/versionCode\s+\d+/, `versionCode ${versionCode}`)
    .replace(/versionName\s+["'][^"']+["']/, `versionName "${versionName}"`)
    .replace(/targetSdkVersion\s+[^ \n]+/, "targetSdkVersion 33");

  fs.writeFileSync(buildGradlePath, content);

  console.log(`✅ Patched build.gradle → versionCode: ${versionCode}, versionName: ${versionName}`);
}

function main() {
  console.log("🧹 Cleaning up android folder...");
  fs.rmSync(path.join(__dirname, "../android"), { recursive: true, force: true });

  run("npx cap add android");
  run("npm run build");
  run("npx cap sync android");

  console.log("📝 Writing local.properties...");
  fs.writeFileSync(localPropsPath, `sdk.dir=${sdkPath}\n`);

  console.log("🛠️  Fixing Java version...");
  run(`node ${fixJavaScript}`);

  console.log("🧬 Patching build.gradle with dynamic version...");
  patchBuildGradle();

  console.log("🏗️  Building APK...");

  const androidDir = path.join(__dirname, "../android");
  const gradleCmd = os.platform() === "win32" ? "gradlew.bat" : "./gradlew";
  run(`${gradleCmd} assembleDebug`, androidDir);

  console.log("\n✅ Build complete! Check android/app/build/outputs/apk/debug/");
}

main();
