import LandingPage from "@/pages/LandingPage";
import TestWrapper from "../support/TestWrapper";

describe("LandingPage Component", () => {
	let onStartQuiz;

	beforeEach(() => {
		onStartQuiz = cy.stub().as("onStartQuiz");

		cy.mount(
			<TestWrapper>
				<LandingPage onStartQuiz={onStartQuiz}/>
			</TestWrapper>,
		);
	});

	it("renders the landing page and starts the quiz", () => {
		cy.contains("Be good to yourself").should("be.visible");
		cy.contains("Take the Quiz").should("be.visible");

		cy.get("[data-cy='start-quiz-button']").click();
		cy.get("@onStartQuiz").should("have.been.calledOnce");
	});

	it("renders all sections of the landing page", () => {
		cy.contains("What we can help with").should("be.visible");
		cy.contains("HAIR LOSS").should("be.visible");
		cy.contains("ERECTILE DYSFUNCTION").should("be.visible");
		cy.contains("PRODUCT").should("be.visible");
		cy.contains("COMPANY").should("be.visible");
		cy.contains("INFO").should("be.visible");
		cy.contains("FOLLOW US").should("be.visible");
	});

});
