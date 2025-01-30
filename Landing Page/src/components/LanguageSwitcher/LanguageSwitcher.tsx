import { ReactElement, FunctionComponent, useEffect, Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcherContainer, LanguageButton } from "@/components/LanguageSwitcher/LanguageSwitcherStyles";
import { resetQuiz } from "@/features/quiz/quizSlice";
import { UnknownAction } from "redux";
import { useDispatch } from "react-redux";

enum Language { EN_US = "EN", FR_FR = "FR" }

const LanguageSwitcher: FunctionComponent = (): ReactElement => {
	const { i18n } = useTranslation();
	const dispatch: Dispatch<UnknownAction> = useDispatch();

	const changeLanguage = (language: string): void => {
		i18n?.changeLanguage(language);
		dispatch(resetQuiz());
	};

	useEffect((): void => {
		document.documentElement.lang = i18n?.language;
	}, [i18n?.language]);

	return (
		<LanguageSwitcherContainer>
			<LanguageButton
				onClick={(): void => changeLanguage("en")}
				aria-label="Switch to English"
				aria-current={i18n?.language === "en" ? "true" : "false"}
				data-cy="language-en"
			>
				{Language.EN_US}
			</LanguageButton>
			<LanguageButton
				onClick={(): void => changeLanguage("fr")}
				aria-label="Switch to French"
				aria-current={i18n?.language === "fr" ? "true" : "false"}
				data-cy="language-fr-desktop"
			>
				{Language.FR_FR}
			</LanguageButton>
		</LanguageSwitcherContainer>
	);
};

export default LanguageSwitcher;
