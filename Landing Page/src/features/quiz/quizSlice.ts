import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { QuizOption } from "@/types/quiz";
import { WritableDraft } from "immer";

interface QuizState {
	answers: QuizOption[];
	currentStep: number;
}

const initialState: QuizState = {
	answers: [],
	currentStep: 0,
};

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		addAnswer (state: WritableDraft<QuizState>, action: PayloadAction<QuizOption>): void {
			state.answers.push(action.payload);
		},
		goToNextStep (state: WritableDraft<QuizState>): void {
			state.currentStep += 1;
		},
		goToPreviousStep (state: WritableDraft<QuizState>): void {
			state.currentStep -= 1;
		},
		resetQuiz (state: WritableDraft<QuizState>): void {
			state.answers = [];
			state.currentStep = 0;
		},
	},
});

export const saveProgress = createAction("quiz/saveProgress");
export const { addAnswer, goToNextStep, goToPreviousStep, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
