# Contributing to Health Landing Page

## Getting Started

```bash
# Use Node 22
nvm use

# Install dependencies
npm install

# Start development server
npm run dev

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

- **TypeScript** compiles: `npm run type-check`
- **Lint** passes: `npm run lint`
- **Format** is correct: `npm run format`
- **Tests** pass: `npm test`

## Project Conventions

### Components
- Use `FunctionComponent` type from React
- Default export at bottom of file
- Each component in its own folder
- Use Tailwind CSS classes for styling
- Use `memo()` for pure presentational components

### Styling
- Use Tailwind CSS utility classes
- Avoid inline styles — use Tailwind or CSS modules
- Design tokens defined in `tailwind.config.ts`

### Data Fetching
- Use React Query hooks for server data
- Use Redux Toolkit for client state
- Always handle loading and error states

### TypeScript
- No `any` without explicit `eslint-disable-next-line`
- Interfaces for all props and data shapes
- Add types to `src/types/`

### Accessibility
- All interactive elements must be keyboard accessible
- Use proper ARIA labels and roles
- Run `cypress-axe` to verify

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components (each in own folder)
├── features/         # Redux slices
├── styles/           # Global styles and theme
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
└── pages/            # Pages (LandingPage, _app)
```

## Reporting Issues

Include:
- Browser version
- Steps to reproduce
- Console errors
- Network tab output (for API errors)