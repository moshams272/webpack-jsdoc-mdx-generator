const fs = require("fs");

function parseDocs(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const docs = JSON.parse(raw);
  
  const functions = docs.filter(
    doc => doc.kind === "function" && !doc.undocumented
  );
  
  return functions;
}

module.exports = parseDocs;