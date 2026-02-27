const fs = require("fs");
const parseDocs = require("./parser.js");
const generateMDX = require("./generate.js");

const docs = parseDocs("./output.json");

const outputDir = "./docs";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

docs.forEach(doc => {
  const mdxContent = generateMDX(doc);
  
  const filePath = `${outputDir}/${doc.name}.mdx`;

  fs.writeFileSync(filePath, mdxContent);
});

console.log("MDX files generated");