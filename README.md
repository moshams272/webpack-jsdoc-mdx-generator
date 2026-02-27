# Webpack API Docs Generator (GSoC 2026 PoC)

This repository contains an early-stage Proof of Concept (PoC) for **Milestone 1** of the [Webpack Documentation Redesign](https://github.com/webpack/docs.webpack.js.org/issues/4) project for Google Summer of Code (GSoC) 2026.

It demonstrates the core mechanism of extracting JSDoc annotations from Webpack's source files, formatting them into MDX, and programmatically interacting with the GitHub API while maintaining strict version control.

## ✨ Current Status & Features

- **🔍 JSDoc Extraction:** Parses source files (e.g., `Compiler.js`) using `jsdoc-api` to output structured JSON data (`output.json`).
- **📝 MDX Generation:** Filters the AST for function nodes and generates boilerplate `.mdx` files detailing parameters and return types.
- **📂 Dynamic Versioning:** Automatically extracts the major version from `package.json` to generate version-specific documentation paths locally (e.g., `docs/v5/api/`), fulfilling the "versioned folder" requirement.
- **🤖 GitHub API Integration:** A dedicated script (`src/github.js`) utilizing `@octokit/rest` to programmatically build Git Trees, commit generated files to the dynamic versioned folder, and open Pull Requests against the target repository.

## 🧠 Architecture Flow

The pipeline is designed with a strict separation of concerns to ensure maintainability:

1. **The Orchestrator (`src/index.js`):** Acts as the main entry point. It reads the project version, prepares the local directory structure, and coordinates the parsing and generation phases.
2. **The Extractor (`src/parser.js`):** Ingests raw Webpack source code, extracts the JSDoc comments, and transforms them into a structured, platform-agnostic JSON format.
3. **The Transformer (`src/generate.js`):** Consumes the structured JSON data and maps it into clean, readable MDX templates (Markdown with React component support).
4. **The Storage:** The orchestrator writes the generated MDX strings into physical files within the dynamically created versioned folder.
5. **The Publisher (`src/github.js`):** An automation script that reads the generated output, connects to the GitHub API, constructs a Git Tree, commits the changes, and opens a targeted Pull Request automatically.

## 🗺️ Roadmap & Next Steps
*This PoC is a functional starting point. To fully meet the GSoC requirements, the following enhancements are planned for the official proposal:*

- [ ] **Comprehensive JSDoc Parsing:** Expand the parser logic beyond `doc.kind === "function"` to fully support `classes`, `hooks`, `plugins`, and `typedefs` native to Webpack's architecture.
- [ ] **True CI/CD Automation (GitHub Actions):** Migrate the manual Node.js Octokit script into a fully automated `.github/workflows/generate-docs.yml` action. This will allow the script to run entirely hands-free upon changes in the upstream repository.
- [ ] **Mintlify & UI Integration (Milestone 2):** Enhance the MDX generator (`src/generate.js`) to output React components and utility classes that align with the required Node.js design system.

## 🚀 How to Run Locally

1. **Prerequisites:**
   Ensure you have a `package.json` with a valid `version` field (e.g., `"version": "5.0.0"`) in the root directory.

2. **Install dependencies:**
```bash
npm install

```

3. **Generate MDX Files:**
Generates versioned `.mdx` files inside the `docs/vX/api/` directory.
```bash
node src/index.js
```


4. **Trigger PR Automation:**
* Create a `.env` file with `GITHUB_TOKEN=your_token_here` (Ignored by Git).
* Configure your target `OWNER` and `REPO` in `src/github.js`.
* Run the automation script:


```bash
node src/github.js
```

---

## 🌟 The Vision (GSoC 2026)

Great documentation is the backbone of an exceptional Developer Experience (DX). This Proof of Concept was built with a deep appreciation for the **Webpack** ecosystem, aiming to bridge the gap between complex internal codebase and accessible, automated documentation.

I am incredibly excited about the opportunity to contribute to Webpack under **Google Summer of Code 2026**. I look forward to the possibility of collaborating with the maintainers to bring this automated pipeline to production!

<div align="center">
<i>Made with 🤍 for the Open Source Community.</i>
</div>
