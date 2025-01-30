import { useTranslation } from "react-i18next";
import React, { FunctionComponent, ReactElement } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import {
	HeroSectionContainer, HeroSectionWrapper, LogoIcon, Title, Subtitle,
} from "@/components/HeroSection/HeroSectionStyles";
import { PrimaryButton } from "@/styles/CommonStyles";

interface HeroSectionProps {
	onStartQuiz: () => void;
}

const HeroSection: FunctionComponent<HeroSectionProps> = ({ onStartQuiz }: HeroSectionProps): ReactElement => {
	const { t } = useTranslation();

	return (
		<HeroSectionContainer>
			<HeroSectionWrapper>
				<a href="https://facebook.com" aria-label="Facebook">
					<LogoIcon src="/assets/svg/header-symbol.svg" alt="Facebook"/>
				</a>
				<LanguageSwitcher/>

				<Title>{t("welcome")}</Title>
				<Subtitle>{t("landingDescription")}</Subtitle>
				<PrimaryButton
					onClick={onStartQuiz}
					aria-label="Start the quiz"
					data-cy="start-quiz-button"
				>
					{t("quizButton")}
				</PrimaryButton>
			</HeroSectionWrapper>
		</HeroSectionContainer>
	);
};

export default HeroSection;
