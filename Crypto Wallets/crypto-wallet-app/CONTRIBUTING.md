# Contributing to Crypto Wallet App

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

- **TypeScript** compiles: `npm run typecheck`
- **Lint** passes: `npm run lint`
- **Format** is correct: `npm run format:check`
- **Tests** pass: `npm test`

## Project Conventions

### Components
- Use `FunctionComponent` type from React
- Default export at bottom of file
- Each component in its own folder with matching `.css` file
- Use `memo()` for pure presentational components

### Styling
- Use CSS custom properties from `src/index.css`
- Follow BEM-like naming: `block__element--modifier`
- No inline styles — use CSS classes

### Data Fetching
- Always use `AbortController` with `fetch()`
- Cache repeated API calls (see `useNativePrice` for example)
- Use `Promise.allSettled` for parallel independent fetches

### TypeScript
- No `any` without explicit `eslint-disable-next-line`
- Interfaces for all props and data shapes
- Add types to `src/types/index.ts`

## Project Structure

```
src/
├── components/     # React components (each in own folder)
├── hooks/          # Custom hooks
├── contexts/       # React Context providers
├── constants/      # Static configuration data
├── utils/          # Pure utility functions
├── types/          # TypeScript interfaces
└── abi/            # Smart contract ABIs
```

## Reporting Issues

Include:
- Browser and MetaMask version
- Steps to reproduce
- Console errors
- Network tab output (for API errors)