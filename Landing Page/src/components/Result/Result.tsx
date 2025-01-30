import { QuizOption } from "@/types/quiz";
import { useTranslation } from "react-i18next";
import { ReactElement, FunctionComponent } from "react";
import { PrimaryButton } from "@/styles/CommonStyles";
import { ResultContainer, ResultText, ResultButtonWrapper } from "@/components/Result/ResultStyles";

interface ResultProps {
	answers: QuizOption[];
	onRestart: () => void;
	onGoBackToLanding: () => void;
}

const Result: FunctionComponent<ResultProps> = ({
	answers,
	onRestart,
	onGoBackToLanding,
}: Readonly<ResultProps>): ReactElement => {
	const { t } = useTranslation();
	const hasRejection: boolean = answers?.some((answer: QuizOption): boolean => answer?.isRejection);

	return (
		<ResultContainer role="main" aria-live="polite">
			<ResultText>
				{hasRejection ? t("resultRejected") : t("resultSuccess")}
			</ResultText>
			<ResultButtonWrapper>
				<PrimaryButton
					onClick={onRestart}
					aria-label="Restart the quiz"
					data-cy="restart-quiz-button"
				>
					{t("restartButton")}
				</PrimaryButton>


				<PrimaryButton
					onClick={onGoBackToLanding}
					aria-label="Go back to the landing page"
					data-cy="go-back-button"
				>
					{t("goBackToTheLandingPage")}
				</PrimaryButton>
			</ResultButtonWrapper>
		</ResultContainer>
	);
};

export default Result;
