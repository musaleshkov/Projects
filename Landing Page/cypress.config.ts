import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000", // Base URL for E2E tests
		specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}", // Pattern for E2E test files
		supportFile: "cypress/support/e2e.ts", // Support file for E2E tests
		viewportWidth: 1280, // Default viewport width
		viewportHeight: 720, // Default viewport height
		video: false, // Disable video recording (optional)
		screenshotOnRunFailure: true, // Enable screenshots on test failure
	},
	component: {
		devServer: {
			framework: "next", // Framework for component testing
			bundler: "webpack", // Bundler for component testing
		},
		specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}", // Pattern for component test files
		supportFile: "cypress/support/component.ts", // Support file for component tests
		indexHtmlFile: "cypress/support/component-index.html", // Custom HTML template for component tests
	},
});
