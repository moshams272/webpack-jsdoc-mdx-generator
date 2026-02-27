const fs = require("fs");
const parseDocs = require("./parser");
const generateMDX = require("./generator");

const docs = parseDocs("../output.json");

const outputDir = "../docs";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

docs.forEach(doc => {
  const mdxContent = generateMDX(doc);
  
  const filePath = `${outputDir}/${doc.name}.mdx`;

  fs.writeFileSync(filePath, mdxContent);
});

console.log("MDX files generated");