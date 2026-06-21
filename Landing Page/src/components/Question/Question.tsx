import { useCallback, useEffect, memo, type ReactElement, type FC, useMemo } from "react";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import type { QuizOption, QuizQuestion } from "@/types/quiz";

interface QuestionProps {
	question: QuizQuestion;
	questionNumber: number;
	totalQuestions: number;
	onAnswer: (option: QuizOption) => void;
	onBack?: () => void;
}

const PageQuestion: FC<QuestionProps> = ({
	question,
	questionNumber,
	totalQuestions,
	onAnswer,
	onBack,
}: QuestionProps): ReactElement => {
	const handleAnswer = useCallback(
		(option: QuizOption): void => {
			onAnswer(option);
		},
		[onAnswer],
	);

	const { t } = useTranslation();

	const sanitizedHTML = useMemo(
		() =>
			question?.options?.reduce(
				(acc, option) => {
					acc[option.display] = DOMPurify.sanitize(option.display, {
						ALLOWED_TAGS: ["img", "span", "br", "strong", "em", "b", "i"],
						ALLOWED_ATTR: ["src", "alt", "class"],
					});
					return acc;
				},
				{} as Record<string, string>,
			) ?? {},
		[question?.options],
	);

	const progressPercent = useMemo(
		() => Math.round(((questionNumber) / totalQuestions) * 100),
		[questionNumber, totalQuestions],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			if (!question?.options?.length) return;

			const digit = parseInt(e.key, 10);
			if (digit >= 1 && digit <= 9 && digit <= question.options.length) {
				e.preventDefault();
				handleAnswer(question.options[digit - 1]);
				return;
			}

			if ((e.key === "Enter" || e.key === " ") && question.options.length === 1) {
				e.preventDefault();
				handleAnswer(question.options[0]);
				return;
			}

			if ((e.key === "Backspace" || e.key === "Escape") && onBack) {
				e.preventDefault();
				onBack();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [question, handleAnswer, onBack]);

	if (!question?.options?.length) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<p className="text-secondary-400 text-lg">{t("noOptionsAvailable")}</p>
			</div>
		);
	}

	const isTwoColumn = question.options.length >= 3;

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-6 sm:px-8 py-16">
			{/* Progress */}
			<div className="w-full max-w-xl mb-12">
				<div className="flex items-center justify-between mb-3">
					<span className="text-xs font-semibold text-secondary-400 uppercase tracking-widest">
						Question {questionNumber} of {totalQuestions}
					</span>
					<span className="text-xs font-semibold text-primary-600 tabular-nums">
						{progressPercent}% complete
					</span>
				</div>
				<div className="w-full h-2 bg-secondary-100 rounded-full overflow-hidden">
					<div
						className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-700 ease-out"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
			</div>

			{/* Question text */}
			<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-3xl leading-tight mb-12">
				{question.question}
			</h2>

			{/* Options */}
			<div
				className={`w-full max-w-2xl grid gap-4 ${
					isTwoColumn ? "sm:grid-cols-2" : "grid-cols-1"
				}`}
			>
				{question.options.map((option: QuizOption, index: number) => (
					<button
						key={option.display}
						onClick={() => handleAnswer(option)}
						aria-label={`Option ${index + 1}`}
						data-cy={`option-${index}`}
						className="group cursor-pointer w-full text-left p-5 sm:p-6 rounded-xl border-2 border-secondary-200 bg-white hover:border-primary-300 hover:shadow-card transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.99]"
					>
						<div className="flex items-start gap-4">
							<span className="shrink-0 w-8 h-8 rounded-lg bg-secondary-100 text-secondary-500 text-sm font-semibold flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors duration-300">
								{index + 1}
							</span>
							<span
								className="text-base sm:text-lg text-foreground group-hover:text-primary-700 transition-colors duration-300 leading-relaxed"
								dangerouslySetInnerHTML={{
									__html: sanitizedHTML[option.display] ?? option.display,
								}}
							/>
						</div>
					</button>
				))}
			</div>

			{/* Back */}
			{onBack && (
				<button
					onClick={onBack}
					aria-label="Go back"
					data-cy="back-button"
					className="mt-10 group cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
				>
					<svg
						className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					{t("backButton")}
				</button>
			)}
		</div>
	);
};

export default memo(PageQuestion);