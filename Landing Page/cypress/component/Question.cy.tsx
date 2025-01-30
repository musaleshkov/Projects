import Question from "@/components/Question/Question";
import { QuizQuestion } from "@/types/quiz";
import TestWrapper from "../support/TestWrapper";

const mockQuestion: QuizQuestion = {
	question: "Which image best matches your hair loss?",
	type: "ChoiceType",
	options: [
		{ display: "Option 1", value: "1", isRejection: false },
		{ display: "Option 2", value: "2", isRejection: true },
	],
};

describe("Question Component", () => {
	let onAnswer;
	let onBack;

	beforeEach(() => {
		// Create stubs inside the beforeEach hook
		onAnswer = cy.stub().as("onAnswer");
		onBack = cy.stub().as("onBack");

		cy.mount(
			<TestWrapper>
				<Question question={mockQuestion} onAnswer={onAnswer} onBack={onBack}/>
			</TestWrapper>,
		);
	});

	it("renders the question and handles answer selection", () => {
		cy.contains("Which image best matches your hair loss?").should("be.visible");
		cy.get("[data-cy='option-0']").click();
		cy.get("@onAnswer").should("have.been.calledWith", mockQuestion.options[0]);
	});

	it("renders the back button and handles back navigation", () => {
		cy.get("[data-cy='back-button']").should("be.visible").click();
		cy.get("@onBack").should("have.been.calledOnce");
	});
});
