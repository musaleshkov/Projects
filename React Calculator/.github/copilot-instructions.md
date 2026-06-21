# GitHub Copilot Instructions — React Calculator

## Project Overview

This is a React 19 + JavaScript calculator app using mathjs for safe expression evaluation. It features a classic calculator UI with dark theme and keyboard support.

## Tech Stack

- React 19, JavaScript (ES6+)
- CSS custom properties with dark theme
- mathjs for expression evaluation
- react-scripts 5.0 for build

## Code Conventions

- Components: functional components, default exports
- Each component in its own folder with co-located `.css` file
- Hooks: custom hooks in `src/hooks/`, file prefix `use*`
- CSS: BEM-like naming with `__` for elements, `--` for modifiers
- Constants: extracted to `src/constants/`
- Imports: relative paths

## Forbidden

- NO `eval()` for expression calculation (use mathjs)
- NO inline styles (use CSS classes)
- NO `var` (use `const`/`let`)

## Patterns

- Custom hooks for state logic extraction
- `useCallback` for event handlers
- `useRef` for tracking previous values

## Commands

- `npm start` — dev server (port 3000)
- `npm run build` — production build
- `npm test` — run tests
- `npm run lint` — ESLint
- `npm run format` — Prettier
