import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuizOption } from "@/types/quiz";

interface QuizState {
	answers: QuizOption[];
	currentStep: number;
	phase: "landing" | "question" | "result";
}

const initialState: QuizState = {
	answers: [],
	currentStep: 0,
	phase: "landing",
};

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		addAnswer(state, action: PayloadAction<QuizOption>): void {
			if (state.answers.length > state.currentStep) {
				state.answers[state.currentStep] = action.payload;
			} else {
				state.answers.push(action.payload);
			}
		},
		goToNextStep(state): void {
			state.currentStep += 1;
		},
		goToPreviousStep(state): void {
			if (state.currentStep > 0) {
				state.answers.pop();
				state.currentStep -= 1;
			}
		},
		setPhase(state, action: PayloadAction<QuizState["phase"]>): void {
			state.phase = action.payload;
		},
		resetQuiz(state): void {
			state.answers = [];
			state.currentStep = 0;
			state.phase = "landing";
		},
	},
});

export const { addAnswer, goToNextStep, goToPreviousStep, setPhase, resetQuiz } =
	quizSlice.actions;
export default quizSlice.reducer;
