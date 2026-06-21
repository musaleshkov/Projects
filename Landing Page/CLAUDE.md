# CLAUDE.md — Project Context for Claude Code / Cline

## Project Identity
- **Name:** Health Landing Page
- **Type:** Next.js 15 SPA + SSR
- **Language:** TypeScript 5.7
- **Node:** >=22.11.0 (pinned in `.nvmrc`)
- **Framework:** Next.js 15 (App Router)

## Quick Start
```bash
npm install
npm run dev          # dev on :3000 (turbopack)
npm run build        # production build
npm run lint         # ESLint (flat config)
npm run format       # Prettier
npm run type-check   # TypeScript
npm run check-all    # All quality checks
```

## Architecture Decisions
1. **Redux Toolkit** for quiz state (answers, current step).
2. **React Query** for server state (API data with caching).
3. **Tailwind CSS** for styling (no Styled Components in new code).
4. **i18next** for EN/FR internationalization.
5. **Cypress + cypress-axe** for E2E and accessibility testing.
6. **Sentry + LogRocket** for error monitoring and session replay.

## Key Files
| Path | Purpose |
|------|---------|
| `src/app/store.ts` | Redux store configuration |
| `src/features/quiz/quizSlice.ts` | Quiz state management |
| `src/pages/_app.tsx` | Root app wrapper (providers) |
| `src/pages/LandingPage.tsx` | Main landing page component |
| `src/components/HeroSection/` | Hero section with CTA |
| `src/components/Quiz/` | Quiz flow component |
| `src/components/Question/` | Individual question component |
| `src/components/Result/` | Quiz result display |
| `src/utils/i18n.ts` | i18next configuration |
| `src/utils/sentry.ts` | Sentry initialization |
| `src/utils/logrocket.ts` | LogRocket initialization |
| `cypress/` | E2E and component tests |

## Quiz Flow
```
Landing Page → Click "Start Quiz" → Question 1 → Question 2 → ... → Result (Success/Rejection)
```

## Component Tree
```
MyApp (_app.tsx)
├── StrictMode
│   └── Sentry.ErrorBoundary
│       └── QueryClientProvider
│           └── Redux Provider
│               └── ThemeProvider
│                   └── I18nextProvider
│                       └── LandingPage
│                           ├── HeroSection
│                           ├── InfoSection
│                           └── FooterSection
```

## What Not To Do
- ❌ Don't add new Styled Components — use Tailwind CSS classes
- ❌ Don't disable `serializableCheck` in Redux — handle serialization
- ❌ Don't use `any` without eslint disable
- ❌ Don't commit `.env` files
- ❌ Don't bypass accessibility checks