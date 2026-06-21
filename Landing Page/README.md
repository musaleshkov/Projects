# 🏥 Health Landing Page

A modern, animated health assessment landing page built with **Next.js 16**, **React 19**, **TypeScript 6**, and **Tailwind CSS v4**. Features an interactive multi-step quiz, internationalization (EN/FR), and a polished glassmorphism design system.

![Hero Section](./Previews/Preview_1.png?raw=true "Hero Section")
![Info Section](./Previews/Preview_2.png?raw=true "Info Cards")
![Quiz Flow](./Previews/Preview_3.png?raw=true "Quiz with Progress")
![Quiz Question](./Previews/Preview_4.png?raw=true "Question View")
![Quiz Result](./Previews/Preview_5.png?raw=true "Result View")

---

## ✨ Features

### 🏠 Landing Page
- **Animated gradient background** with floating blob shapes
- **Fixed glass header** with backdrop blur and language switcher
- **Scroll-triggered card animations** via Intersection Observer
- **Dark footer** with multi-column layout and gradient accent
- **Full responsive** — desktop, tablet, and mobile

### 📝 Interactive Quiz
- **Multi-step questionnaire** with progress bar and percentage
- **Keyboard navigation** — 1–9 keys to select options, Backspace/Escape to go back
- **Numbered option cards** with hover lift and border highlights
- **Rejection logic** — custom paths for qualifying/disqualifying answers
- **Confetti celebration** on successful completion (respects reduced-motion)

### 🌍 Internationalization
- **English (EN) and French (FR)** support via i18next
- **Pill-style language switcher** with active state
- **All UI text externalized** — easy to add more languages

### ♿ Accessibility
- **ARIA labels and roles** on all interactive elements
- **Keyboard-first** quiz navigation
- **Reduced motion support** — respects `prefers-reduced-motion` media query
- Tested with `cypress-axe` for WCAG compliance

### 🎨 Design System
- **Tailwind CSS v4** with `@theme` CSS-based design tokens
- **Custom color scales** — primary, secondary, accent (10 shades each)
- **7 CSS keyframe animations** — float, fadeIn, slideInRight, shimmer, confetti
- **Glassmorphism utilities** — `glass`, `gradient-text`, `btn-hover`
- **Dark mode ready** — `:root` / `.dark` CSS variables

### 🧪 Testing & Quality
- **Cypress E2E** and component testing with `cypress-axe`
- **ESLint v10** flat config with TypeScript strict rules
- **Prettier** with consistent formatting
- **SonarQube** + **Qodana** static analysis
- **GitHub Actions CI/CD** pipeline

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2 | React framework (Turbopack) |
| React | 19.2 | UI framework |
| TypeScript | 6.0 | Type safety |
| Tailwind CSS | 4.3 | Utility-first styling |
| Redux Toolkit | 2.12 | Quiz state management |
| React Query | 5.101 | Server state + API caching |
| i18next | 26.3 | Internationalization |
| DOMPurify | 3.4 | XSS sanitization |
| Cypress | 15.17 | E2E + component testing |
| Sentry | 10.59 | Error monitoring |
| LogRocket | 12.1 | Session replay |

---

## 🚦 Quick Start

```bash
# Prerequisites: Node.js 22 (see .nvmrc)
nvm use

# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start

# Run all quality checks
npm run check-all
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack, port 3000) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Auto-format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript type checking |
| `npm run cypress:open` | Open Cypress GUI |
| `npm run cypress:run` | Run Cypress headless |
| `npm test` | Lint + type-check + Cypress |
| `npm run check-all` | All quality checks |
| `npm run audit` | Security audit |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css            # Tailwind v4 @theme + animations + utilities
│   └── store.ts               # Redux store configuration
│
├── components/
│   ├── ErrorBoundary/         # Crash boundary with retry UI
│   ├── Footer/                # Dark footer with gradient accent
│   ├── GlassCard/             # Reusable glassmorphism card
│   ├── HeroSection/           # Animated hero with floating blobs
│   ├── InfoSection/           # Card grid with scroll animations
│   ├── LanguageSwitcher/      # Pill-style EN/FR toggle
│   ├── Question/              # Quiz question with progress bar
│   ├── Quiz/                  # Quiz flow controller
│   ├── Result/                # Success/rejection with confetti
│   └── Skeleton/              # Shimmer loading placeholder
│
├── constants/
│   └── footer.ts              # Social link constants
│
├── features/
│   └── quiz/                  # Redux slice (phase state machine)
│
├── hooks/
│   └── useInView.ts           # Intersection Observer hook
│
├── pages/
│   ├── _app.tsx               # Root provider wrapper
│   ├── _document.tsx          # Custom HTML document (SEO)
│   ├── index.tsx              # Home page (landing ↔ quiz transition)
│   └── LandingPage.tsx        # Landing page layout
│
├── styles/
│   └── CommonStyles.tsx       # Shared button components
│
├── types/
│   └── quiz.ts                # Quiz type definitions
│
└── utils/
    ├── api.ts                 # Quiz data fetching
    ├── i18n.ts                # i18next configuration (EN + FR)
    ├── logrocket.ts           # Session replay init
    └── sentry.ts              # Error monitoring init
```

---

## 🏗 Architecture

### Component Tree

```
Home (index.tsx)
├── [Loading] Skeleton fallback
├── [Landing] LandingPage
│   ├── HeroSection           ← animated blobs + glass header
│   ├── InfoSection           ← card grid + useInView animations
│   └── FooterSection         ← dark theme + gradient accent
└── [Quiz] Quiz (dynamic import)
    ├── Question              ← progress bar + option cards
    └── Result                ← success/rejection + confetti
```

### State Management
- **Redux Toolkit** — Quiz state (`answers`, `currentStep`, `phase`)
- **React Query** — API data with 5-min cache and retry
- **i18next** — Translation state with language persistence

### Quiz Flow
```
Landing → Click "Take the Quiz" → Question 1 → ... → Question N
                                                          ↓
                                          Result (Success 🎉 / Rejection ⚠️)
```

---

## 🧪 Developer Tooling

| Tool | Config File |
|------|------------|
| SonarQube | `sonar-project.properties` |
| Qodana | `qodana.yaml` |
| ESLint | `eslint.config.mjs` (flat config v10) |
| Prettier | `.prettierrc` |
| EditorConfig | `.editorconfig` |
| Cursor AI | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Claude/Cline | `CLAUDE.md` |

---

## 📝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow and code conventions.

---

## 📄 License

Private project — all rights reserved.

---

## 🔗 Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Query Docs](https://tanstack.com/query)
- [i18next Docs](https://www.i18next.com/)