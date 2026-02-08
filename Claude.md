# PriceCompare NZ - Agent Context

## 📍 Project Links
- **Main Docs:** `README.md` (Features & Overview)
- **Progress Tracking:** `docs/progress.md` (Create this to track store integration status)
- **Tech Stack Details:** See `package.json` and `vite.config.ts`

## 🛠 Critical Commands
- **Install:** `npm install`
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Type Check:** `npm run type-check` (if applicable)

## ⚖️ Coding Standards
- **Language:** TypeScript (Strict mode enabled).
- **Styling:** CSS (as seen in repo) - keep styles modular.
- **Components:** Functional components with descriptive prop types.
- **Naming:** - Files: `kebab-case` for utilities, `PascalCase` for components.
  - Variables/Functions: `camelCase`.
- **Data Fetching:** Standardize how we scrape/fetch from Pak'nSave, New World, and Woolworths to keep the logic consistent across stores.

## 🧠 Strategic Memory
- Before adding a new supermarket or scraper, check `docs/progress.md`.
- Always verify that price parsing logic handles NZD formatting and weight-based pricing correctly.
