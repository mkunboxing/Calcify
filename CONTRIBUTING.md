# Contributing to Calcify 🚀

Thank you for your interest in contributing to **Calcify**! Calcify is an open-source suite of 66+ fast, private, web-based calculators and developer utility tools.

We welcome all contributions: bug fixes, new tools, documentation updates, design enhancements, and feature requests.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Local Development Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/mkunboxing/Calcify.git
   cd Calcify
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ➕ Adding a New Calculator or Utility Tool

Adding a tool to Calcify is quick and standardized! Follow these steps:

1. **Create the Tool Component** in `src/components/tools/`:
   - Create a TypeScript React component (e.g., `src/components/tools/YourToolName.tsx`).
   - Use standard UI layout, Tailwind CSS variables, and modern responsive design.
   - Include clear input validation and real-time or trigger-based calculations.

2. **Add Unit Tests** in `src/__tests__/`:
   - Create tests using Vitest (e.g., `src/__tests__/YourToolName.test.ts`).

3. **Register the Tool** in the category metadata and routing:
   - Export your tool and register its slug, category, meta description, and keywords.

---

## 🧪 Testing

Run unit tests to ensure all tools calculation logic works as expected:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 📜 Pull Request Guidelines

- Ensure your code compiles without TypeScript errors (`npx tsc --noEmit`).
- Ensure all tests pass (`npm test`).
- Keep PRs focused on a single feature or bug fix.
- Provide a concise description of your changes in the PR description.

---

## ⚖️ Code of Conduct

Please treat all maintainers and contributors with respect and kindness. Let's build awesome open-source tools together!
