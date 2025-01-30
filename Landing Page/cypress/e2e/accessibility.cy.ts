import "cypress-axe";

describe("Accessibility Tests", () => {
	it("Landing Page should be accessible", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.checkA11y();
	});

	it("Quiz Page should be accessible", () => {
		cy.startQuiz();
		cy.injectAxe();
		cy.checkA11y();
	});

	it("Result Page should be accessible", () => {
		cy.startQuiz();
		cy.selectOption(0);
		cy.injectAxe();
		cy.checkA11y();
	});
});
