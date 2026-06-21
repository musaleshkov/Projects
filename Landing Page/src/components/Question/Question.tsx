import { useCallback, memo, type ReactElement, type FC } from "react";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import type { QuizOption, QuizQuestion } from "@/types/quiz";
import { QuizButton } from "@/styles/CommonStyles";

interface QuestionProps {
	question: QuizQuestion;
	onAnswer: (option: QuizOption) => void;
	onBack?: () => void;
}

const Question: FC<QuestionProps> = ({
	question,
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

	const sanitizedHTML = (option: QuizOption): string =>
		DOMPurify.sanitize(option.display, {
			ALLOWED_TAGS: ["img"],
			ALLOWED_ATTR: ["src", "alt"],
		});

	if (!question?.options?.length) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<p className="text-foreground text-lg">{t("noOptionsAvailable")}</p>
			</div>
		);
	}

	const renderQuestionOptions: ReactElement[] = question.options.map(
		(option: QuizOption, index: number): ReactElement => (
			<QuizButton
				key={`${index}-${option.display}`}
				onClick={(): void => handleAnswer(option)}
				aria-labelledby={`question-text option-${index}`}
				data-cy={`option-${index}`}
			>
				<div dangerouslySetInnerHTML={{ __html: sanitizedHTML(option) }} />
			</QuizButton>
		),
	);

	const hasMultipleOptions = question.options.length > 2;

	return (
		<div role="main" className="flex flex-col items-center justify-center min-h-[60vh] p-8">
			<h2 id="question-text" className="text-2xl font-bold text-foreground mb-8">
				{question.question}
			</h2>

			{hasMultipleOptions ? (
				<div className="grid grid-cols-2 gap-4 max-w-[600px]">{renderQuestionOptions}</div>
			) : (
				renderQuestionOptions
			)}

			{onBack && (
				<div className="mt-8">
					<QuizButton
						onClick={onBack}
						aria-label="Go back to the previous question"
						data-cy="back-button"
					>
						{t("backButton")}
					</QuizButton>
				</div>
			)}
		</div>
	);
};

export default memo(Question);
