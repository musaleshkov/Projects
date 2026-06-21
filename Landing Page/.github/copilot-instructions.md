# GitHub Copilot Instructions — Health Landing Page

## Project Context

This is a Next.js 15 health assessment landing page with an interactive quiz. It uses Redux Toolkit for quiz state, React Query for API data, Tailwind CSS for styling, and i18next for internationalization (EN + FR).

## General Rules

- Use TypeScript with strict mode — no `any` without eslint-disable
- Components use `FunctionComponent<Props>` type annotation and default exports
- Use Tailwind CSS utility classes for all new styling (not Styled Components)
- Always add proper ARIA labels and roles for accessibility
- Handle loading and error states in all data-fetching components
- Use barrel exports (`index.ts`) for component directories
- Follow React 19 patterns (avoid deprecated APIs)

## Component Template

```tsx
"use client";

import { type FunctionComponent, type ReactElement } from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

const MyComponent: FunctionComponent<MyComponentProps> = ({
  title,
  onAction,
}: MyComponentProps): ReactElement => {
  return (
    <div className="...">
      <h1>{title}</h1>
    </div>
  );
};

export default MyComponent;
```

## Path Aliases

- `@/` resolves to `src/`
- Example: `import { useAppSelector } from "@/app/store";`

## Testing

- E2E tests in `cypress/e2e/`
- Component tests in `cypress/component/`
- Use `cypress-axe` for accessibility assertions
