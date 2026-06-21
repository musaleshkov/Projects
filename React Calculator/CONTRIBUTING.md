# Contributing to React Calculator

## Getting Started

```bash
# Use Node 20
nvm use

# Install dependencies
npm install

# Start development server
npm start

# Run all checks
npm run check-all
```

## Development Workflow

1. Create a feature branch from `main`
2. Make changes
3. Run `npm run check-all` before committing
4. Commit with descriptive messages
5. Open a pull request

## Code Quality

Before submitting changes, ensure:

- **Lint** passes: `npm run lint`
- **Format** is correct: `npm run format:check`
- **Tests** pass: `npm test`

## Project Conventions

### Components
- Functional components with default exports
- Each component in its own folder with matching `.css` file
- Co-located CSS alongside components

### Styling
- Use CSS custom properties from `src/index.css`
- Follow BEM-like naming: `block__element--modifier`
- No inline styles — use CSS classes

### JavaScript
- Use `const` and `let` (no `var`)
- Strict equality (`===`) always
- No `eval()` for calculations (use mathjs)
- Use `useCallback` for event handlers passed as props
- Use `useRef` for tracking previous values

### Project Structure

```
src/
├── hooks/          # Custom React hooks
│   └── useCalculator.js      # Calculator state logic
├── components/     # React components
│   ├── Calculator/           # Main calculator UI
│   │   ├── Calculator.js
│   │   └── Calculator.css
│   └── CalculatorDisplay/    # Display component
│       ├── CalculatorDisplay.js
│       └── CalculatorDisplay.css
├── constants/      # Button layouts and constants
│   └── commonConstants.js
├── App.js          # Root component
├── App.css         # Root layout styles
├── index.js        # Entry point
└── index.css       # Global CSS custom properties
```

## Reporting Issues

Include:
- Browser version
- Steps to reproduce
- Console errors