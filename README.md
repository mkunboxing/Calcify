# 🧮 Calcify — Open-Source Calculators & Utility Tools

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Vercel Analytics](https://img.shields.io/badge/Analytics-Vercel-000000?logo=vercel)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**Calcify** is a free, fast, private, and open-source suite of **66+ online calculators and developer utility tools**. Designed for finance, health, math, daily conversions, text processing, and developer productivity — all running locally in the browser with zero data telemetry or mandatory accounts.

---

## ✨ Features

- ⚡ **66+ Free Tools**: Finance (EMI, SIP, GST, Mortgage), Math, Health (BMI, BMR), Unit Converters, Text & Developer utilities.
- 🔒 **Privacy First**: All calculations happen client-side in your browser. No server logging, no tracking of user inputs.
- 📊 **Vercel Analytics**: Integrated with `@vercel/analytics` for privacy-friendly web performance insights.
- 📱 **Progressive Web App (PWA)**: Install Calcify on mobile & desktop for offline access.
- 🌙 **Dark & Light Mode**: Seamless theme switcher with zero flash of unstyled theme (FOUC).
- 🧪 **Fully Tested**: Powered by Vitest test suite for accurate, reliable mathematical formulas.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm / bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mkunboxing/Calcify.git
   cd Calcify
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view Calcify in action.

---

## 🛠️ Project Structure

```text
Calcify/
├── public/               # Static assets, icons, PWA manifest, service worker
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # UI components, header, footer, & 66+ calculator tools
│   │   ├── layout/       # Header, Footer, Navigation
│   │   ├── pwa/          # PWA installation prompts
│   │   └── tools/        # Individual calculator & utility tool components
│   ├── context/          # React Context (ThemeContext)
│   └── __tests__/        # Vitest test suite
├── package.json          # Dependencies & scripts
└── vitest.config.ts      # Vitest configuration
```

---

## 📜 Available Scripts

- `npm run dev`: Launch development server.
- `npm run build`: Build optimized production bundle.
- `npm run start`: Run production server locally.
- `npm test`: Run unit tests with Vitest.
- `npm run test:watch`: Run tests in watch mode.

---

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](file:///Users/mucool/Desktop/codes/Calcify/CONTRIBUTING.md) for guidelines on adding new tools, running tests, and submitting pull requests.

---

## 📄 License

This project is open source and available under the [MIT License](file:///Users/mucool/Desktop/codes/Calcify/LICENSE).
