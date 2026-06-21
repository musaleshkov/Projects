import { type ReactElement, type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resetQuiz } from "@/features/quiz/quizSlice";
import { useAppDispatch } from "@/app/store";

const LanguageSwitcher: FC = (): ReactElement => {
	const { i18n } = useTranslation();
	const dispatch = useAppDispatch();

	const changeLanguage = (language: string): void => {
		i18n?.changeLanguage(language);
		dispatch(resetQuiz());
	};

	useEffect((): void => {
		document.documentElement.lang = i18n?.language;
	}, [i18n?.language]);

	const isActive = (lang: string): boolean => i18n?.language === lang;

	return (
		<div className="flex gap-1 bg-secondary-100 rounded-lg p-0.5">
			<button
				onClick={() => changeLanguage("en")}
				aria-label="Switch to English"
				data-cy="language-en"
				className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
					isActive("en")
						? "bg-white text-foreground shadow-sm"
						: "text-secondary-500 hover:text-foreground"
				}`}
			>
				EN
			</button>
			<button
				onClick={() => changeLanguage("fr")}
				aria-label="Switch to French"
				data-cy="language-fr"
				className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
					isActive("fr")
						? "bg-white text-foreground shadow-sm"
						: "text-secondary-500 hover:text-foreground"
				}`}
			>
				FR
			</button>
		</div>
	);
};

export default LanguageSwitcher;