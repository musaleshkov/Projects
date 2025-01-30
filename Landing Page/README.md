# Health Case Study - Frontend Engineer Assignment

This project is a landing page with an interactive quiz, built as part of the **Frontend Engineer Case Study** for
Health. The goal is to create a responsive, accessible, and dynamic landing page that helps users determine if health is
the right product for them.

---

## **Technologies Used**

### **Frontend**

- **[Next.js](https://nextjs.org/)** - A React framework for server-side rendering, static site generation, and
  optimized performance.
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - A typed superset of JavaScript for better code quality and
  maintainability.
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management for managing quiz state (answers, current step,
  etc.).
- **[Styled Components](https://styled-components.com/)** - CSS-in-JS for styling components with dynamic and responsive
  designs.
- **[React i18next](https://react.i18next.com/)** - Internationalization (i18n) for supporting multiple languages (
  English and French).
- **[Cypress](https://www.cypress.io/)** - End-to-end testing and component testing.
- **[Sentry](https://sentry.io/)** - Error tracking and monitoring.
- **[LogRocket](https://logrocket.com/)** - Session replay and performance monitoring.

### **Backend**

- **[Axios](https://axios-http.com/)** - HTTP client for fetching quiz data from an API or falling back to local JSON.
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Proxying API
  requests to an external server.

### **Styling**

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
- **[Geist Font](https://vercel.com/font)** - A modern font family optimized for Vercel and Next.js.

### **DevOps**

- **[Vercel](https://vercel.com/)** - Deployment platform for Next.js applications.
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD for automated testing and deployment.

---

## **Features**

### **Landing Page**

- Responsive design that works on all screen sizes (desktop, tablet, mobile).
- Hero section with a call-to-action button to start the quiz.
- Information section explaining what Health can help with (e.g., hair loss, erectile dysfunction).
- Footer with links to products, company information, and social media.

### **Quiz**

- Dynamic quiz loaded from a JSON file or API.
- Full-screen questions with a clean, distraction-free UI.
- Users can navigate back and forth between questions.
- Rejection logic: If a user selects an option with `isRejection === true`, they are shown a rejection message.
- Success message: If the user completes the quiz without rejection, they are shown a success message.

### **Internationalization**

- Supports English (`EN`) and French (`FR`) languages.
- Language switcher in the header for seamless language changes.

### **Accessibility**

- Fully accessible with proper ARIA labels, roles, and keyboard navigation.
- Tested with `cypress-axe` for compliance with accessibility standards.

### **Testing**

- End-to-end tests for the quiz flow using Cypress.
- Component tests for individual components like `Question`, `Result`, and `LanguageSwitcher`.
- Accessibility tests to ensure the app is usable by everyone.

---

## **Design Decisions**

### **State Management**

- **Redux Toolkit** was chosen for state management because it simplifies the process of managing complex state (e.g.,
  quiz answers, current step) and provides built-in support for asynchronous actions.

### **Styling**

- **Styled Components** was used for its flexibility and ability to create dynamic, responsive styles. It also
  integrates well with React and TypeScript.
- **Tailwind CSS** was added for utility-first styling, making it easier to build responsive UIs quickly.

### **Internationalization**

- **React i18next** was chosen for its simplicity and robust support for multilingual applications. It allows for easy
  translation management and dynamic language switching.

### **Testing**

- **Cypress** was selected for end-to-end and component testing due to its ease of use, powerful debugging tools, and
  ability to test accessibility.

### **Error Handling**

- **Sentry** and **LogRocket** were integrated to monitor errors and user sessions in production, ensuring a smooth user
  experience.

---

## **Setup Instructions**

### **Prerequisites**

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/health-case-study.git
   cd health-case-study
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### **Running the Project**

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### **Running Tests**

1. Run Cypress tests:
   ```bash
   npm run cypress:open
   # or
   yarn cypress:open
   # or
   pnpm cypress:open
   ```
2. Run accessibility tests:
   ```bash
   npm run cypress:run
   # or
   yarn cypress:run
   # or
   pnpm cypress:run
   ```

### **Deployment**

1. Deploy to Vercel:
   ```bash
   vercel
   ```
2. Follow the prompts to deploy your project.

---

## **Folder Structure**

```
health-case-study/
├── cypress/               # Cypress tests
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   ├── features/          # Redux slices
│   ├── styles/            # Styled components and global styles
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions (e.g., i18n, Sentry)
├── .env.local             # Environment variables
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project documentation
```

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- [Manual](https://www.manual.co/) for providing the case images.
- [Figma](https://www.figma.com/) for the design mockup.
- [Vercel](https://vercel.com/) for hosting and deployment.
