# 🧮 React Calculator

A modern, dark-themed calculator built with **React 19**, **JavaScript**, and **mathjs**. Features a glassmorphism UI with animated gradient background, keyboard support, and safe expression evaluation.

![Preview](./Preview.png?raw=true "Calculator Preview")

---

## ✨ Features

- **Basic operations** — addition, subtraction, multiplication, division
- **Safe evaluation** — uses mathjs `evaluate()` instead of `eval()`
- **Keyboard support** — type numbers and operators directly
- **Clear and backspace** — AC/C button clears all, backspace removes last character
- **Glassmorphism dark theme** — CSS custom properties with animated gradient background
- **Responsive design** — works on desktop and mobile
- **Hover effects** — smooth button transitions and interactive feedback

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2 | UI framework |
| mathjs | 15.2 | Safe expression evaluation |
| react-scripts | 5.0 | Build tooling (CRA) |
| Jest | CRA bundled | Testing |
| ESLint | CRA bundled | Linting |

---

## 🚦 Quick Start

```bash
# Prerequisites: Node.js >=20 (see .nvmrc)
nvm use

# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:3000

# Production build
npm run build

# Run all checks
npm run check-all
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm test` | Run tests once (CI mode) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Auto-format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run check-all` | Run all quality checks |
| `npm run clean` | Remove build/coverage |

---

## 📁 Project Structure

```
src/
├── hooks/
│   └── useCalculator.js             # Calculator state logic
├── components/
│   ├── Calculator/
│   │   ├── Calculator.js            # Main calculator UI + button grid
│   │   └── Calculator.css           # Calculator-specific styles
│   └── CalculatorDisplay/
│       ├── CalculatorDisplay.js     # Input and result display
│       └── CalculatorDisplay.css    # Display-specific styles
├── constants/
│   └── commonConstants.js           # Button layouts and constants
├── App.js                           # Root component
├── App.css                          # Root layout styles
├── index.js                         # Entry point (createRoot)
└── index.css                        # CSS custom properties (theme tokens)
```

---

## 🏗 Architecture

### Component Tree
```
App
└── Calculator
    └── CalculatorDisplay
```

### Data Flow
```
Button Click / Keyboard → useCalculator hook → state → CalculatorDisplay
                              ↓
                    mathjs.evaluate(expression) → result
```

### State Management
- **`useCalculator`** — Custom hook encapsulating all calculator state and logic
- State: `displayValue`, `operator`, `waitingForOperand`, `firstOperand`, `clearAll`

---

## 🧪 Developer Tooling

| Tool | Config File |
|------|------------|
| SonarQube | `sonar-project.properties` |
| Qodana | `qodana.yaml` |
| ESLint | `.eslintrc.json` |
| Prettier | `.prettierrc` |
| EditorConfig | `.editorconfig` |
| TypeScript | `tsconfig.json` (allowJs) |
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

- [React Docs](https://react.dev/)
- [mathjs Docs](https://mathjs.org/)
- [Create React App Docs](https://create-react-app.dev/)