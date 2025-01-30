declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to start the quiz.
		 * @example cy.startQuiz()
		 */
		startQuiz(): Chainable<void>;

		/**
		 * Custom command to check accessibility.
		 * @example cy.checkA11y()
		 */
		checkA11y(): Chainable<void>;

		/**
		 * Custom command to inject axe-core for accessibility testing.
		 * @example cy.injectAxe()
		 */
		injectAxe(): Chainable<void>;

		/**
		 * Custom command to select an option by index.
		 * @example cy.selectOption(0)
		 */
		selectOption(index: number): Chainable<void>;

		/**
		 * Custom command to switch language.
		 * @example cy.switchLanguage('fr')
		 */
		switchLanguage(language: string): Chainable<void>;
	}
}
