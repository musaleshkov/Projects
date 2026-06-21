# GitHub Copilot Instructions — Crypto Wallet App

## Project Context

- **Stack:** React 19, TypeScript 4.9, ethers.js v6, react-scripts (CRA)
- **Theme:** Dark glassmorphism with CSS custom properties
- **State:** Context API + custom hooks (no Redux, no Zustand)
- **Wallet:** Custom `WalletContext` with ethers.js (MetaMask only)

## Do

- Use `const` by default, `let` only when reassigning
- Use arrow functions for components and callbacks
- Add `memo()` to pure presentational components
- Use `useCallback()` for event handlers passed as props
- Use `useRef()` for mount tracking and race condition guards
- Add `AbortController` to every `fetch()` call
- Add `loading="lazy"` on `<img>` elements
- Use CSS custom properties (`var(--color-*)`) for colors
- Follow BEM-like naming: `block__element--modifier`
- Use `Promise.allSettled()` for parallel async operations
- Default exports for components, named exports for utils

## Don't

- Don't use `react-moralis`, `moralis`, or any Moralis SDK
- Don't use `@/` path aliases (CRA doesn't support without craco)
- Don't use inline `style={{}}` — use CSS classes
- Don't use `any` type without a `// eslint-disable-next-line` comment
- Don't import `useEffect` without using it
- Don't leave console.log in production code

## Component Template

\`\`\`tsx
import { FunctionComponent, memo } from "react";
import "./Component.css";

interface ComponentProps {
title: string;
}

const Component: FunctionComponent<ComponentProps> = memo(({ title }) => {
return <div className="component">{title}</div>;
});

export default Component;
\`\`\`

## File Structure

```
src/
  components/ComponentName/ComponentName.tsx + .css
  hooks/useHookName.ts
  contexts/ContextName.tsx
  constants/data-name.ts
  utils/utility.ts
  types/index.ts
```
