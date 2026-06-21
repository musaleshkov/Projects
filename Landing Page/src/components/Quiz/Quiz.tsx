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

	const totalSteps = quizData?.questions?.length ?? 0;
	const isComplete = currentStep >= totalSteps;

	const handleAnswer = (answer: QuizOption): void => {
		dispatch(addAnswer(answer));
		dispatch(goToNextStep());
	};

	const handleBack = (): void => {
		dispatch(goToPreviousStep());
	};

	if (!quizData?.questions?.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary-50 to-white">
				<p className="text-secondary-500 text-lg">{t("noQuizData")}</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
			{isComplete ? (
				<Result
					answers={answers}
					onRestart={() => dispatch(resetQuiz())}
					onGoBackToLanding={onGoBackToLanding}
				/>
			) : (
				<Question
					question={quizData.questions[currentStep]}
					questionNumber={currentStep + 1}
					totalQuestions={totalSteps}
					onAnswer={handleAnswer}
					onBack={currentStep > 0 ? handleBack : undefined}
				/>
			)}
		</div>
	);
};

export default Quiz;