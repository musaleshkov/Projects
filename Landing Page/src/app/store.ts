import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store: EnhancedStore = configureStore({
	reducer: {
		quiz: quizReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
