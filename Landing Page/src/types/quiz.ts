export interface QuizOption {
	display: string;
	value: string | boolean;
	isRejection: boolean;
}

export interface QuizQuestion {
	id: string;
	question: string;
	type: string;
	options: QuizOption[];
}

export interface QuizData {
	questions: QuizQuestion[];
}