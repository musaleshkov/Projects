import { useTranslation } from "react-i18next";
import { type FunctionComponent, type ReactElement } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { PrimaryButton } from "@/styles/CommonStyles";

interface HeroSectionProps {
	onStartQuiz: () => void;
}

const HeroSection: FunctionComponent<HeroSectionProps> = ({
	onStartQuiz,
}: HeroSectionProps): ReactElement => {
	const { t } = useTranslation();

	return (
		<section
			className="w-full min-h-[70vh] flex flex-col justify-center items-start text-center px-8 py-16 bg-cover bg-center bg-no-repeat md:min-h-[50vh] md:items-center md:px-4 md:py-8 sm:min-h-[40vh] sm:px-2 sm:py-4"
			style={{ backgroundImage: "url(/assets/svg/FirstSectionBackground.svg)" }}
		>
			<a
				href="https://facebook.com"
				aria-label="Facebook"
				className="absolute left-20 top-8 md:left-12 md:top-4 sm:left-6"
			>
				<img
					src="/assets/svg/header-symbol.svg"
					alt="Facebook"
					className="w-12 h-12"
				/>
			</a>

			<LanguageSwitcher />

			<div className="flex flex-col items-start text-left pl-20 max-w-[55%] md:max-w-[55%] md:mr-[42%] sm:max-w-[74%] sm:mr-[33%] sm:pl-6">
				<h1 className="text-5xl font-bold text-foreground mb-4">
					{t("welcome")}
				</h1>
				<p className="text-xl text-foreground mb-8 max-w-[37.5rem] leading-relaxed">
					{t("landingDescription")}
				</p>
				<PrimaryButton
					onClick={onStartQuiz}
					aria-label="Start the quiz"
					data-cy="start-quiz-button"
					className="mb-4"
				>
					{t("quizButton")}
				</PrimaryButton>
			</div>
		</section>
	);
};

export default HeroSection;