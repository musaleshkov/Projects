import Result from "@/components/Result/Result";
import { QuizOption } from "@/types/quiz";
import TestWrapper from "../support/TestWrapper";

const mockAnswers: QuizOption[] = [
	{ display: "Option 1", value: "1", isRejection: false },
	{ display: "Option 2", value: "2", isRejection: true },
];

describe("Result Component", () => {
	let onRestart;
	let onGoBackToLanding;

	beforeEach(() => {
		onRestart = cy.stub().as("onRestart");
		onGoBackToLanding = cy.stub().as("onGoBackToLanding");

		cy.mount(
			<TestWrapper>
				<Result answers={mockAnswers} onRestart={onRestart} onGoBackToLanding={onGoBackToLanding}/>
			</TestWrapper>,
		);
	});

	// it("shows the success message when there are no rejections", () => {
	// 	cy.contains(
	// 		"Congratulations! 🎉 You did an amazing job on the quiz! Your hard work and dedication have paid off. Keep up the great work, and continue striving for excellence. Success is yours—celebrate this win and keep moving forward! 💪✨").
	// 		should("be.visible");
	// });

	it("shows the rejection message when there is a rejection", () => {
		cy.contains(
			"Thank you for taking the quiz! While this may not have been the result you were hoping for, remember that every setback is a setup for a comeback. Use this as an opportunity to learn, grow, and come back even stronger. You’ve got this! 💪🌟").
			should("be.visible");
	});
});
