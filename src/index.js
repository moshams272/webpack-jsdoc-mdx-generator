const fs = require("fs");
const path = require("path");

const parseDocs = require("./parser.js");
const generateMDX = require("./generate.js");

const jsonPath = path.join(__dirname, "../output.json"); 
const docs = parseDocs(jsonPath);

const outputDir = path.join(__dirname, "../docs");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

docs.forEach(doc => {
  const mdxContent = generateMDX(doc);
  const filePath = path.join(outputDir, `${doc.name}.mdx`);

  fs.writeFileSync(filePath, mdxContent);
});

console.log(`Generated ${docs.length} MDX files in ${outputDir}`);