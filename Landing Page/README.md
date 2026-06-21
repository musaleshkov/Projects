# Health Case Study - Frontend Engineer Assignment

This project is a landing page with an interactive quiz, built as part of the **Frontend Engineer Case Study** for Health. The goal is to create a responsive, accessible, and dynamic landing page that helps users determine if health is the right product for them.

---

## **Technologies Used**

### **Frontend**

- **[Next.js](https://nextjs.org/)** - React framework with server-side rendering and Turbopack support
- **[React](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management for quiz state
- **[React Query](https://tanstack.com/query)** - Server state and API data caching
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React i18next](https://react.i18next.com/)** - Internationalization (EN + FR)
- **[Cypress](https://www.cypress.io/)** - End-to-end and component testing
- **[Sentry](https://sentry.io/)** - Error tracking and monitoring
- **[LogRocket](https://logrocket.com/)** - Session replay and performance monitoring

### **DevOps & Quality**

- **[Vercel](https://vercel.com/)** - Deployment platform
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **[SonarQube](https://www.sonarsource.com/)** - Code quality analysis
- **[Qodana](https://www.jetbrains.com/qodana/)** - JetBrains static analysis
- **[ESLint](https://eslint.org/)** - Linting (flat config v9)
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** + **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit hooks

---

## **Features**

### **Landing Page**

- Responsive design for all screen sizes (desktop, tablet, mobile)
- Hero section with call-to-action button
- Info section explaining health services
- Footer with product links, company info, and social media

### **Quiz**

- Dynamic quiz loaded from JSON file or API
- Full-screen questions with distraction-free UI
- Navigation between questions (forward/backward)
- Rejection logic with custom messages
- Success message on quiz completion

### **Internationalization**

- English (EN) and French (FR) support
- Language switcher in header

### **Accessibility**

- ARIA labels, roles, and keyboard navigation
- Tested with `cypress-axe` for WCAG compliance

### **Testing**

- Cypress E2E tests for quiz flow
- Component tests for individual components
- Accessibility tests with `cypress-axe`

---

## **Setup Instructions**

### **Prerequisites**

- Node.js >=22.11.0 (see `.nvmrc`)
- npm >=11.0.0

### **Installation**

```bash
# Clone the repository
git clone https://github.com/your-username/health-case-study.git
cd health-case-study

# Install dependencies
npm install
```

### **Development**

```bash
# Start dev server with Turbopack
npm run dev

# Open http://localhost:3000
```

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack, port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
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
| `npm run clean` | Remove .next, build, coverage |

### **Running Tests**

```bash
# Open Cypress GUI
npm run cypress:open

# Run all tests (lint + types + Cypress)
npm test
```

### **Deployment**

```bash
# Deploy to Vercel
vercel
```

---

## **Project Structure**

```
├── .github/
│   ├── workflows/ci.yml           # CI pipeline
│   └── copilot-instructions.md    # GitHub Copilot rules
├── cypress/                       # Cypress tests
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   └── store.ts               # Redux store
│   ├── components/
│   │   ├── ErrorBoundary/         # Component crash boundary
│   │   ├── Footer/                # Footer section
│   │   ├── HeroSection/           # Hero section
│   │   ├── InfoSection/           # Info section
│   │   ├── LanguageSwitcher/      # Language toggle
│   │   ├── Question/              # Quiz question
│   │   ├── Quiz/                  # Quiz flow
│   │   ├── Result/                # Quiz result
│   │   └── Skeleton/              # Loading skeleton
│   ├── features/
│   │   └── quiz/                  # Quiz Redux slice
│   ├── pages/                     # Page components
│   ├── styles/                    # Theme and global styles
│   ├── types/                     # TypeScript interfaces
│   └── utils/                     # Utilities (i18n, Sentry, LogRocket)
├── .cursorrules                   # Cursor AI rules
├── .editorconfig                  # Editor consistency
├── .env.example                   # Environment variables template
├── .nvmrc                         # Node version pin
├── .prettierrc                    # Prettier config
├── CHANGELOG.md                   # Release history
├── CLAUDE.md                      # Claude/Cline context
├── CONTRIBUTING.md                # Contribution guide
├── eslint.config.mjs              # ESLint flat config
├── LICENSE                        # MIT License
├── next.config.ts                 # Next.js config
├── postcss.config.mjs             # PostCSS config
├── qodana.yaml                    # Qodana config
├── sonar-project.properties       # SonarQube config
├── tailwind.config.ts             # Tailwind config
└── tsconfig.json                  # TypeScript config
```

---

## **Quality Gates**

| Tool | Config File |
|------|------------|
| SonarQube | `sonar-project.properties` |
| Qodana | `qodana.yaml` |
| ESLint | `eslint.config.mjs` |
| Prettier | `.prettierrc` |
| EditorConfig | `.editorconfig` |
| Cursor AI | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Claude/Cline | `CLAUDE.md` |

---

## **Contributing**

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow and code conventions.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.