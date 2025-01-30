import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import TestWrapper from "../support/TestWrapper";

describe("LanguageSwitcher Component", (): void => {
	beforeEach(() => {
		cy.mount(
			<TestWrapper>
				<LanguageSwitcher/>
			</TestWrapper>,
		);
	});

	it("should languages be visible", (): void => {
		cy.contains("EN").should("be.visible");
		cy.contains("FR").should("be.visible");
	});
});
