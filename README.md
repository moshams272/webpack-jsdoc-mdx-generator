# 🚀 Webpack API Docs Generator (GSoC 2026 PoC)

This repository contains an early-stage Proof of Concept (PoC) for **Milestone 1** of the [Webpack Documentation Redesign](https://github.com/webpack/docs.webpack.js.org/issues/4) project for Google Summer of Code (GSoC) 2026.

It demonstrates the core mechanism of extracting JSDoc annotations from Webpack's source files, formatting them into MDX, and programmatically interacting with the GitHub API while maintaining strict version control.

## ✨ Current Status & Features

- **🔍 JSDoc Extraction:** Parses source files using `jsdoc-api` to output structured JSON data.
- **📝 Structured MDX Generation:** Dynamically generates boilerplate `.mdx` files with proper markdown hierarchy, supporting **Classes, Constructors, Methods, and standalone Functions**.
- **📂 Dynamic Versioning:** Automatically extracts the major version from `package.json` to generate version-specific documentation paths locally (e.g., `docs/v5/api/`), grouping outputs into `classes/` and `functions/` subdirectories.
- **🤖 GitHub API Integration:** A dedicated script (`src/github.js`) utilizing `@octokit/rest` to programmatically build Git Trees (capable of recursive traversal for nested directories), commit generated files, and open Pull Requests automatically.

## 🧠 Architecture Flow

The pipeline is designed with a strict separation of concerns to ensure maintainability:

1. **The Orchestrator (`src/index.js`):** Acts as the main entry point. It reads the project version, prepares the local directory structure, and coordinates the parsing and generation phases.
2. **The Extractor (`src/parser.js`):** Ingests raw Webpack source code, extracts the JSDoc comments, and transforms them into a structured, platform-agnostic JSON format.
3. **The Transformer (`src/generate.js`):** Consumes the structured JSON data and maps it into clean, readable MDX templates.
4. **The Storage:** The orchestrator writes the generated MDX strings into physical files within the dynamically created versioned folder.
5. **The Publisher (`src/github.js`):** An automation script that reads the generated output, connects to the GitHub API, constructs a Git Tree, commits the changes, and opens a targeted Pull Request automatically.

### 📊 Pipeline Diagram

```text
[Webpack Source] 
       │ (JSDoc Extraction)
       ▼
 [output.json] ──► (Currently pre-generated for PoC)
       │
       ▼
  [parser.js] ──► (Extracts Classes, Methods, Functions)
       │
       ▼
 [generate.js] ──► (Formats into structured MDX)
       │
       ▼
[Local File System] ──► (e.g., docs/v5/api/classes/Compiler.mdx)
       │
       ▼
 [github.js] ──► (Octokit creates Tree, Commit, and PR)

```

## ⚠️ Current Limitations (PoC Scope)

As this is an early-stage PoC, there are a few known limitations that will be addressed in the final CI/CD implementation:

* **Pre-generated AST:** The script currently consumes a manually generated `output.json`. In the final GSoC project, this extraction step will be automated directly against the webpack repository inside the CI workflow.
* **Complex Typedefs & Overloads:** Deeply nested custom `@typedef` declarations and overloaded function signatures require further AST traversal enhancements.
* **Incomplete Entity Coverage:** The current parser successfully extracts Functions, Classes, Constructors, and Instance Methods. However, it does not yet fully map `static` methods, `getters/setters`, class properties, or Webpack-specific architecture like `Tapable hooks` and `Plugins`. Expanding this coverage is a primary goal for the GSoC coding period.

## 🗺️ Roadmap & Next Steps

*This PoC is a functional starting point. To fully meet the GSoC requirements, the following enhancements are planned for the official proposal:*

* [x] **Core Entity Parsing:** Support extraction and MDX rendering of `Functions`, `Classes`, `Constructors`, and `Methods`. *(Completed)*
* [ ] **Advanced JSDoc Parsing:** Expand the parser logic to fully support `hooks`, `plugins`, and complex `typedefs` native to Webpack's architecture.
* [ ] **True CI/CD Automation (GitHub Actions):** Migrate the manual Node.js Octokit script into a fully automated `.github/workflows/generate-docs.yml` action. This will allow the script to run entirely hands-free upon changes in the upstream repository.
* [ ] **Mintlify & UI Integration (Milestone 2):** Enhance the MDX generator (`src/generate.js`) to output React components and utility classes that align with the required Node.js design system.

## 🚀 How to Run Locally

1. **Prerequisites:**
Ensure you have a `package.json` with a valid `version` field (e.g., `"version": "5.0.0"`) in the root directory.

2. **Install dependencies:**
The PoC relies on standard Node.js modules (`fs`, `path`) and explicitly requires `@octokit/rest` for the GitHub API and `dotenv` for environment variables management.
```bash
npm install @octokit/rest dotenv
```

3. **Extract JSDoc to JSON (Manual Step for PoC):**
Currently, the PoC requires a pre-generated `output.json`. You can generate this by running the JSDoc CLI on a Webpack source file (e.g., `Compiler.js`).
Run the following command (assuming you have Webpack's source code locally):
```bash
npx jsdoc -X path/to/webpack/lib/Compiler.js > output.json
```
*(Ensure the resulting `output.json` is placed in the root directory of this project).*

4. **Generate MDX Files:**
Generates versioned `.mdx` files inside the `docs/vX/api/` directory (categorized into `classes/` and `functions/`).
```bash
node src/index.js
```


5. **Trigger PR Automation:**
* Create a `.env` file with `GITHUB_TOKEN=your_token_here` (Ignored by Git).
* Configure your target `OWNER` and `REPO` in `src/github.js`.
* Run the automation script:


```bash
node src/github.js
```
---

## 🌟 The Vision (GSoC 2026)

Great documentation is the backbone of an exceptional Developer Experience (DX). This Proof of Concept was built with a deep appreciation for the **Webpack** ecosystem, aiming to bridge the gap between complex internal codebase and accessible, automated documentation.

I am incredibly excited about the opportunity to contribute to Webpack under **Google Summer of Code 2026**. I look forward to the possibility of collaborating with the maintainers to bring this automated pipeline to production! 🚀

<div align="center">
<i>Made with 🤍 for the Open Source Community.</i>
</div>
