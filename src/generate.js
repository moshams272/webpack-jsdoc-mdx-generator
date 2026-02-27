const fs = require("fs");
const path = require("path");

function formatParams(params) {
  if (!params.length) return "";

  let output = "## Parameters\n\n";
  params.forEach((p) => {
    const type = p.type?.names?.join(", ") || "any";
    output += `- **${p.name}** (*${type}*) - ${p.description || ""}\n`;
  });

  return output + "\n";
}

function formatReturns(returns) {
  if (!returns.length) return "";

  const r = returns[0];
  const type = r.type?.names?.join(", ") || "void";

  return `## Returns\n\n- *${type}* - ${r.description || ""}\n\n`;
}

function generateFunctionFile(fn, outputDir) {
  let content = `# ${fn.name}\n\n`;
  content += `${fn.description}\n\n`;
  content += formatParams(fn.params);
  content += formatReturns(fn.returns);

  fs.writeFileSync(
    path.join(outputDir, `${fn.name}.mdx`),
    content
  );
}

function generateClassFile(cls, outputDir) {
  let content = `# ${cls.name}\n\n`;
  content += `${cls.description}\n\n`;

  if (cls.constructor) {
    content += `## Constructor\n\n`;
    content += formatParams(cls.constructor.params);
  }

  if (cls.methods.length) {
    content += `## Methods\n\n`;

    cls.methods.forEach((method) => {
      content += `### ${method.name}`;
      if (method.scope === "static") {
        content += " _(static)_";
      }
      content += "\n\n";

      content += `${method.description}\n\n`;
      content += formatParams(method.params);
      content += formatReturns(method.returns);
    });
  }

  fs.writeFileSync(
    path.join(outputDir, `${cls.name}.mdx`),
    content
  );
}

function generateFiles(data, baseOutputDir) {
  const functionsDir = path.join(baseOutputDir, "functions");
  const classesDir = path.join(baseOutputDir, "classes");

  if (!fs.existsSync(baseOutputDir)) fs.mkdirSync(baseOutputDir,{ recursive: true });
  if (!fs.existsSync(functionsDir)) fs.mkdirSync(functionsDir);
  if (!fs.existsSync(classesDir)) fs.mkdirSync(classesDir);

  data.functions.forEach((fn) =>
    generateFunctionFile(fn, functionsDir)
  );

  data.classes.forEach((cls) =>
    generateClassFile(cls, classesDir)
  );
}

module.exports = generateFiles;