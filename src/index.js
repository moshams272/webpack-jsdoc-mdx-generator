const fs = require("fs");
const path = require("path");
const parseDocs = require("./parser.js");
const generateFiles = require("./generate.js");

const packageJsonPath = path.join(__dirname, "../package.json");
const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const majorVersion = packageData.version.split(".")[0]; 
const versionFolder = `v${majorVersion}`;

const inputPath = path.join(__dirname, "../output.json");
const outputDir = path.join(__dirname, `../docs/${versionFolder}/api`);

try {
  const parsedData = parseDocs(inputPath);
  generateFiles(parsedData, outputDir);
  console.log(`Generated MDX files in ${outputDir}`);
} catch (err) {
  console.error("Error generating docs: ", err);
}