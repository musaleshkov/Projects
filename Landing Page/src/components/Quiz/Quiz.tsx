import { Dispatch, ReactElement, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/app/store";
import { addAnswer, goToNextStep, goToPreviousStep, resetQuiz } from "@/features/quiz/quizSlice";
import Question from "../Question/Question";
import Result from "../Result/Result";
import { QuizData, QuizOption } from "@/types/quiz";
import { UnknownAction } from "redux";
import { PrimaryButton } from "@/styles/CommonStyles";
import { useTranslation } from "react-i18next";
import { QuizContainer } from "@/components/Quiz/QuizStyles";

export interface QuizProps {
	quizData: QuizData | undefined;
	onGoBackToLanding: () => void;
}

const Quiz: FunctionComponent<QuizProps> = ({ quizData, onGoBackToLanding }: QuizProps): ReactElement => {
	const dispatch: Dispatch<UnknownAction> = useDispatch();
	const { t } = useTranslation();
	const { answers, currentStep } = useSelector((state: RootState) => state?.quiz);
	localStorage.setItem("quizProgress", JSON.stringify(store.getState().quiz));

	const handleAnswer: (answer: QuizOption) => void = (answer: QuizOption): void => {
		dispatch(addAnswer(answer));
		dispatch(goToNextStep());
	};

	const handleBack: () => void = (): void => dispatch(goToPreviousStep());

	if (!quizData) {
		return <p>{t("noQuizData")}</p>;
	}

	if (currentStep >= quizData?.questions?.length) {
		return <Result answers={answers} onRestart={(): void => dispatch(resetQuiz())}
		               onGoBackToLanding={onGoBackToLanding}/>;
	}

	return (
		<QuizContainer role="main" aria-live="polite">
			<Question
				question={quizData?.questions[currentStep]}
				onAnswer={handleAnswer}
				onBack={currentStep > 0 ? handleBack : undefined}
			/>
			{currentStep < 1 && (
				<>
					<PrimaryButton
						onClick={(): void => dispatch(resetQuiz())}
						aria-label="Reset the quiz"
						data-cy="reset-quiz-button"
					>
						{t("restartQuiz")}
					</PrimaryButton>

					<PrimaryButton
						onClick={onGoBackToLanding}
						aria-label="Go back to the landing page"
						data-cy="go-back-button"
					>
						{t("goBackToTheLandingPage")}
					</PrimaryButton>
				</>
			)}
		</QuizContainer>
	);
};

export default Quiz;
