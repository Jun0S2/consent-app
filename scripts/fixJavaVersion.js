const fs = require("fs");
const path = require("path");

const targetDirs = [
  path.join(__dirname, "../android"),                          // 프로젝트의 android 폴더
  path.join(__dirname, "../node_modules/@capacitor")           // capacitor 모듈 전체
];

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith(".gradle")) {
      results.push(fullPath);
    }
  });
  return results;
}

targetDirs.forEach((targetDir) => {
  const files = walk(targetDir);
  files.forEach((filePath) => {
    let content = fs.readFileSync(filePath, "utf8");
    if (content.includes("VERSION_21")) {
      const updated = content.replace(/JavaVersion\.VERSION_21/g, "JavaVersion.VERSION_17");
      fs.writeFileSync(filePath, updated);
      console.log(`✅ Patched: ${filePath}`);
    }
  });
});
