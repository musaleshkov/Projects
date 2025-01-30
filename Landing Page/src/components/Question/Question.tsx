import React, { useCallback, ReactElement, FunctionComponent } from "react";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import { QuizOption, QuizQuestion } from "@/types/quiz";
import { QuestionButtonWrapper, QuestionContainer } from "@/components/Question/QuestionStyles";
import { QuizButton } from "@/components/Quiz/QuizStyles";

interface QuestionProps {
	question: QuizQuestion;
	onAnswer: (option: QuizOption) => void;
	onBack?: () => void;
}

const Question: FunctionComponent<QuestionProps> = ({ question, onAnswer, onBack }: QuestionProps): ReactElement => {
	const handleAnswer: (option: QuizOption) => void = useCallback((option: QuizOption): void => {
		onAnswer(option);
	}, [onAnswer]);

	const { t } = useTranslation();

	const sanitizedHTML: (option: QuizOption) => string = (option: QuizOption): string => DOMPurify.sanitize(
		option.display, {
			ALLOWED_TAGS: ["img"],
			ALLOWED_ATTR: ["src", "alt"],
		});

	const renderQuestionOptions: ReactElement[] = question?.options?.map(
		(option: QuizOption, index: number): ReactElement => (
			<QuizButton
				key={`${index}-${option?.display}-${option?.value}`}
				onClick={(): void => handleAnswer(option)}
				aria-labelledby={`question-text option-${index}`}
				data-cy={`option-${index}`}
			>
				<div dangerouslySetInnerHTML={{ __html: sanitizedHTML(option) }}/>
			</QuizButton>
		));

	return (
		<QuestionContainer role="main">
			<h2 id="question-text">{question?.question}</h2>
			{question?.options?.length > 2 ? <QuestionButtonWrapper>
					{renderQuestionOptions}
				</QuestionButtonWrapper> :
				renderQuestionOptions
			}
			{onBack && (
				<div>
					<QuizButton
						onClick={onBack}
						aria-label="Go back to the previous question"
						data-cy="back-button"
					>
						{t("backButton")}
					</QuizButton>
				</div>
			)}
		</QuestionContainer>
	);
};

export default React.memo(Question);
