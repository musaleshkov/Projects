import type { QuizOption } from "@/types/quiz";
import { useTranslation } from "react-i18next";
import { type ReactElement, type FC } from "react";
import { PrimaryButton } from "@/styles/CommonStyles";

interface ResultProps {
	answers: QuizOption[];
	onRestart: () => void;
	onGoBackToLanding: () => void;
}

const Result: FC<ResultProps> = ({
	answers,
	onRestart,
	onGoBackToLanding,
}: ResultProps): ReactElement => {
	const { t } = useTranslation();
	const hasRejection = answers?.some((answer: QuizOption): boolean => answer?.isRejection);

	return (
		<div
			role="main"
			aria-live="polite"
			className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-secondary-50"
		>
			<p className="text-2xl font-bold text-foreground mb-8">
				{hasRejection ? t("resultRejected") : t("resultSuccess")}
			</p>
			<div className="flex gap-4 flex-wrap justify-center">
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
			</div>
		</div>
	);
};

export default Result;
