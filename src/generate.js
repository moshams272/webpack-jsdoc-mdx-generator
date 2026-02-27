function generateMDX(doc) {
  let mdx = `# ${doc.name}\n\n`;

  if (doc.params && doc.params.length > 0) {
    mdx += `## Parameters\n\n`;

    doc.params.forEach(param => {
      const type = param.type?.names?.join(" | ") || "unknown";
      const description = param.description || "";

      mdx += `- \`${param.name}\` (${type}): ${description}\n`;
    });

    mdx += `\n`;
  }

  if (doc.returns && doc.returns.length > 0) {
    mdx += `## Returns\n\n`;

    const returnType = doc.returns[0].type?.names?.join(" | ") || "unknown";
    const returnDescription = doc.returns[0].description || "";

    mdx += `\`${returnType}\` — ${returnDescription}\n\n`;
  }

  return mdx;
}

module.exports = generateMDX;