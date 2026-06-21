import { type ReactElement, type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resetQuiz } from "@/features/quiz/quizSlice";
import { useAppDispatch } from "@/app/store";

enum Language {
	EN_US = "EN",
	FR_FR = "FR",
}

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
		<div className="absolute right-8 top-8 flex gap-2 z-10 md:right-4 md:top-2 sm:right-2">
			<button
				onClick={() => changeLanguage("en")}
				aria-label="Switch to English"
				aria-current={isActive("en") ? "true" : "false"}
				data-cy="language-en"
				className={`px-3 py-1 rounded-md text-sm font-bold uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
					isActive("en")
						? "bg-primary-600 text-white"
						: "bg-secondary-100 text-foreground hover:bg-secondary-200"
				}`}
			>
				{Language.EN_US}
			</button>
			<button
				onClick={() => changeLanguage("fr")}
				aria-label="Switch to French"
				aria-current={isActive("fr") ? "true" : "false"}
				data-cy="language-fr-desktop"
				className={`px-3 py-1 rounded-md text-sm font-bold uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
					isActive("fr")
						? "bg-primary-600 text-white"
						: "bg-secondary-100 text-foreground hover:bg-secondary-200"
				}`}
			>
				{Language.FR_FR}
			</button>
		</div>
	);
};

export default LanguageSwitcher;