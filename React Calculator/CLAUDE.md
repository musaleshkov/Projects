# CLAUDE.md — Project Context for Claude Code / Cline

## Project Identity
- **Name:** React Calculator
- **Type:** React 19 SPA (CRA)
- **Language:** JavaScript (ES6+)
- **Node:** >=20 (pinned to 20 in `.nvmrc`)
- **Repo:** `https://github.com/musaleshkov/Projects` (subdirectory `React Calculator`)

## Quick Start
```bash
npm install
npm start        # dev on :3000
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
npm test         # Jest (CRA)
```

## Architecture Decisions
1. **mathjs for calculation.** No `eval()`. Uses mathjs `evaluate()` for safe expression evaluation.
2. **Custom hook extraction.** `useCalculator` hook encapsulates all calculator state and logic, separated from UI rendering.
3. **Co-located CSS.** Each component folder contains its own `.css` file alongside `.js`.
4. **CSS custom properties.** Dark theme via CSS variables with glassmorphism effects.
5. **Keyboard support.** Number pad keys + enter/escape for calculation.

## Key Files
| Path | Purpose |
|------|---------|
| `src/hooks/useCalculator.js` | Calculator state logic (digit entry, operators, clear, etc.) |
| `src/components/Calculator/Calculator.js` | Main calculator UI + button grid |
| `src/components/Calculator/Calculator.css` | Calculator-specific styles |
| `src/components/CalculatorDisplay/CalculatorDisplay.js` | Input and result display |
| `src/components/CalculatorDisplay/CalculatorDisplay.css` | Display-specific styles |
| `src/constants/commonConstants.js` | Button layouts and constants |
| `src/index.css` | Global CSS custom properties |

## Component Tree
```
App
└── Calculator
    └── CalculatorDisplay
```

## Data Flow
```
Button Click / Keyboard → useCalculator hook → state update → CalculatorDisplay
                              ↓
                    mathjs.evaluate(expression) → result
```

## What Not To Do
- Don't use `eval()` for calculations
- Don't add inline styles
- Don't add unnecessary dependencies (keep CRA minimal)
- Don't use `var` (use `const`/`let` always)