// scripts/fixJavaVersion.js
const fs = require("fs");
const path = require("path");

const targetDirs = [
  path.join(__dirname, "../android"),
  path.join(__dirname, "../node_modules/@capacitor")
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

targetDirs.forEach((dir) => {
  const files = walk(dir);
  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes("VERSION_21")) {
      const updated = content.replace(/JavaVersion\.VERSION_21/g, "JavaVersion.VERSION_17");
      fs.writeFileSync(file, updated);
      console.log(`✅ Patched: ${file}`);
    }
  });
});
