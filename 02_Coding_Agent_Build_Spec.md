# Calculator + Utility Platform — Coding Agent Build Spec

This file is optimized for direct use with a coding agent. The DOCX PRD is the human-readable source of truth.

## Build order
1. Platform shell + tool registry + SEO metadata + tests
2. First 20 MVP tools
3. Category/index/search + related tools
4. File/developer utilities
5. Analytics/admin/content workflow
6. Expand only from observed demand

## First 20 tools
- Percentage Calculator
- Age Calculator
- Date Difference Calculator
- EMI Calculator
- SIP Calculator
- Compound Interest Calculator
- GST Calculator
- Discount Calculator
- BMI Calculator
- TDEE Calculator
- Attendance Calculator
- CGPA/GPA Calculator
- Length Converter
- Weight Converter
- Temperature Converter
- Word Counter
- QR Code Generator
- Image Compressor
- JSON Formatter & Validator
- Base64 Encode/Decode

## Core architecture rules
- TypeScript strict mode.
- Pure logic functions separate from UI.
- Client-side processing by default.
- No auth required for free tools.
- No sensitive values in analytics/logs.
- SSR/SSG unique explanatory content.
- Lazy-load heavy file/PDF/image libraries.
- Version any rule-dependent calculators.

## Per-tool schema
```ts
type ToolDefinition = {
  slug: string;
  type: "calculator" | "utility";
  category: string;
  title: string;
  shortDescription: string;
  componentKey: string;
  maintenanceClass: "evergreen" | "rule-dependent" | "data-dependent" | "health-disclaimer";
  disclaimerType?: string;
  related: string[];
  seo: { title: string; description: string };
  publishState: "draft" | "published" | "noindex";
};
```

## Acceptance checklist
- [ ] Inputs validated
- [ ] Correct deterministic output
- [ ] Unit tests: normal/boundary/invalid/reference
- [ ] Mobile at 320px
- [ ] Keyboard accessible
- [ ] Unique title/meta/intro
- [ ] Formula/processing explanation
- [ ] Worked example
- [ ] Related tools
- [ ] Disclaimer/freshness metadata
- [ ] No sensitive analytics
- [ ] Performance checked

## Master agent instruction
```text
You are the lead full-stack engineer for an SEO-first Calculator + Utility platform. Implement the product described in this PRD incrementally. Do not generate hundreds of pages at once. Start with the shared architecture and first 20 MVP tools.

Engineering rules:
1) TypeScript strict mode. Keep calculation logic pure and unit-tested.
2) Prefer browser-side/local processing for calculations and files.
3) Build a tool registry so pages, metadata, categories, related tools and maintenance/disclaimers are data-driven.
4) Use reusable ToolShell/Input/Result/Formula/Example/FAQ/RelatedTools components.
5) No sensitive-input analytics. No hidden file upload.
6) SSR/SSG all primary SEO content.
7) Add structured validation and graceful errors.
8) Add tests before marking a tool done.
9) Keep heavy libraries lazy-loaded.
10) Never invent tax/financial/medical rules. If a rule is not configured, require user input or mark the tool unavailable.

For each milestone, output: files changed, architecture decisions, tests added, commands to run, environment variables, manual QA checklist, and known limitations. Do not silently expand scope.
```
