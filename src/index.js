const fs = require("fs");
const generateMDX = require("./generate.js");

const fileContent = fs.readFileSync("output.json", "utf-8");

const docs = JSON.parse(fileContent);

const firstFunction = docs.find(
  doc => doc.kind === "function" && !doc.undocumented
);

const mdxContent = generateMDX(firstFunction);

console.log(mdxContent);