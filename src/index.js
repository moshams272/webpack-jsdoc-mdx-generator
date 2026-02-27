const fs = require("fs");
const path = require("path");

const parseDocs = require("./parser.js");
const generateMDX = require("./generate.js");

const packageJsonPath = path.join(__dirname, "../package.json");
const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const majorVersion = packageData.version.split(".")[0]; 
const versionFolder = `v${majorVersion}`;

const jsonPath = path.join(__dirname, "../output.json"); 
const docs = parseDocs(jsonPath);

const outputDir = path.join(__dirname, `../docs/${versionFolder}/api`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

docs.forEach(doc => {
  const mdxContent = generateMDX(doc);
  const filePath = path.join(outputDir, `${doc.name}.mdx`);

  fs.writeFileSync(filePath, mdxContent);
});

console.log(`Generated ${docs.length} MDX files in ${outputDir}`);