describe("Quiz Flow", (): void => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("completes the quiz successfully", (): void => {
		cy.get("[data-cy='start-quiz-button']").click();
		cy.wait(2000);
		cy.get("[data-cy='option-1']").click();
		cy.wait(2000);
		cy.get("[data-cy='option-1']").click();
		cy.wait(2000);
		cy.get("[data-cy='option-1']").click();
		cy.wait(2000);
		cy.contains(
			"Congratulations! 🎉 You did an amazing job on the quiz! Your hard work and dedication have paid off. Keep up the great work, and continue striving for excellence. Success is yours—celebrate this win and keep moving forward! 💪✨").
			should("be.visible");
	});

	// it("shows rejection message when user selects a rejection option", () => {
	// 	cy.get("[data-cy='start-quiz-button']").click();
	// 	cy.wait(2000);
	// 	cy.get("[data-cy='option-1']").click();
	// 	cy.wait(2000);
	// 	cy.get("[data-cy='option-1']").click();
	// 	cy.wait(2000);
	// 	cy.get("[data-cy='option-1']").click();
	// 	cy.wait(2000);
	// 	cy.contains(
	// 		"Thank you for taking the quiz! While this may not have been the result you were hoping for, remember that every setback is a setup for a comeback. Use this as an opportunity to learn, grow, and come back even stronger. You’ve got this! 💪🌟").
	// 		should("be.visible");
	// });

	it("allows user to go back and change answers", (): void => {
		cy.get("[data-cy='start-quiz-button']").click();
		cy.wait(2000);

		cy.get("[data-cy='option-1']").click();
		cy.wait(2000);

		cy.get("[data-cy='back-button']").click();
		cy.wait(2000);

		cy.get("[data-cy='option-1']").click();
		cy.wait(2000);
		cy.get("[data-cy='option-1']").click();
 
	});

	it("switches language from English to French", (): void => {
		cy.get("[data-cy='language-fr-desktop']").click();
		cy.contains("Soyez bon envers vous-même").should("be.visible");
		cy.contains("Faire le Quiz").should("be.visible");
	});
});
