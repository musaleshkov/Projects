import { useEffect, type ReactElement, type FC } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
	addAnswer,
	goToNextStep,
	goToPreviousStep,
	setPhase,
	resetQuiz,
} from "@/features/quiz/quizSlice";
import Question from "@/components/Question/Question";
import Result from "@/components/Result/Result";
import type { QuizData, QuizOption } from "@/types/quiz";
import { PrimaryButton } from "@/styles/CommonStyles";
import { useTranslation } from "react-i18next";

export interface QuizProps {
	quizData: QuizData | undefined;
	onGoBackToLanding: () => void;
}

const Quiz: FC<QuizProps> = ({ quizData, onGoBackToLanding }: QuizProps): ReactElement => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const answers = useAppSelector((state) => state.quiz.answers);
	const currentStep = useAppSelector((state) => state.quiz.currentStep);

	useEffect(() => {
		dispatch(setPhase("question"));
	}, [dispatch]);

	const handleAnswer = (answer: QuizOption): void => {
		dispatch(addAnswer(answer));
		dispatch(goToNextStep());
	};

	const handleBack = (): void => {
		dispatch(goToPreviousStep());
	};

	if (!quizData?.questions?.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-secondary-50">
				<p className="text-foreground text-lg">{t("noQuizData")}</p>
			</div>
		);
	}

	const isLastQuestion = currentStep >= quizData.questions.length;

	return (
		<div
			role="main"
			aria-live="polite"
			className="flex flex-col items-center justify-center text-center overflow-hidden bg-secondary-50 min-h-screen"
		>
			{isLastQuestion ? (
				<Result
					answers={answers}
					onRestart={() => dispatch(resetQuiz())}
					onGoBackToLanding={onGoBackToLanding}
				/>
			) : (
				<>
					<Question
						question={quizData.questions[currentStep]}
						onAnswer={handleAnswer}
						onBack={currentStep > 0 ? handleBack : undefined}
					/>
					{currentStep < 1 && (
						<div className="flex flex-col items-center gap-2 mt-4">
							<PrimaryButton
								onClick={() => dispatch(resetQuiz())}
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
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Quiz;