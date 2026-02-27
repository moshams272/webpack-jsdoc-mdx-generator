const fs = require("fs");

function parseDocs(jsonPath) {
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const docs = JSON.parse(raw);

  const functions = [];
  const classes = [];

  docs.forEach((doc) => {
    if (
      doc.kind === "function" &&
      !doc.memberof &&
      !doc.undocumented
    ) {
      functions.push({
        name: doc.name,
        description: doc.description || "",
        params: doc.params || [],
        returns: doc.returns || []
      });
    }
  });

  docs.forEach((doc) => {
    if (
      doc.kind === "class" &&
      doc.meta?.code?.type === "ClassDeclaration" &&
      !doc.undocumented
    ) {
      const className = doc.longname;

      const constructor = docs.find(
        (item) =>
          item.longname === className &&
          item.meta?.code?.type === "MethodDefinition" &&
          !item.undocumented
      );

      const methods = docs.filter(
        (item) =>
          item.kind === "function" &&
          item.memberof === className &&
          !item.undocumented
      );

      classes.push({
        name: className,
        description: doc.description || "",
        constructor: constructor
          ? {
              params: constructor.params || []
            }
          : null,
        methods: methods.map((method) => ({
          name: method.name,
          description: method.description || "",
          params: method.params || [],
          returns: method.returns || [],
          scope: method.scope || "instance"
        }))
      });
    }
  });

  return { functions, classes };
}

module.exports = parseDocs;