// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to start the quiz.
			 * @example cy.startQuiz()
			 */
			startQuiz (): void;

			/**
			 * Custom command to select an option by index.
			 * @example cy.selectOption(0)
			 */
			selectOption (index: number): void;

			/**
			 * Custom command to switch language.
			 * @example cy.switchLanguage('fr')
			 */
			switchLanguage (language: string): void;
		}
	}
}

Cypress.Commands.add("startQuiz", () => {
	cy.get("[data-cy='start-quiz-button']").click();
});

Cypress.Commands.add("selectOption", (index: number) => {
	cy.get(`[data-cy='option-${index}']`).click();
});

Cypress.Commands.add("switchLanguage", (language: string): void => {
	cy.get(`[data-cy="language-${language}"]`).click();
});
