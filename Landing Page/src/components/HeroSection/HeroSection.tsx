import { useTranslation } from "react-i18next";
import { type ReactElement, type FC } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PrimaryButton } from "@/styles/CommonStyles";

interface HeroSectionProps {
	onStartQuiz: () => void;
}

const HeroSection: FC<HeroSectionProps> = ({ onStartQuiz }: HeroSectionProps): ReactElement => {
	const { t } = useTranslation();

	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-50 via-primary-50/30 to-secondary-100">
			{/* Animated gradient blobs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-400/20 blur-3xl animate-float" />
				<div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-400/20 blur-3xl animate-float-delayed" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary-300/10 blur-3xl animate-pulse-soft" />
			</div>

			{/* Fixed top bar */}
			<div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<img
							src="/assets/svg/header-symbol.svg"
							alt="Logo"
							className="w-10 h-10"
						/>
						<span className="font-bold text-lg gradient-text hidden sm:inline">
							Health
						</span>
					</div>
					<LanguageSwitcher />
				</div>
			</div>

			{/* Hero content */}
			<div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
				<span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6 tracking-wide">
					{t("welcome")}
				</span>

				<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mb-6">
					{t("landingDescription")}
				</h1>

				<p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mb-10 leading-relaxed">
					{t("takeQuizDescription")}
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<PrimaryButton
						onClick={onStartQuiz}
						aria-label="Start the quiz"
						data-cy="start-quiz-button"
						className="px-10 py-5 text-lg rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-glass hover:shadow-glass-lg btn-hover"
					>
						{t("quizButton")} →
					</PrimaryButton>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
				<svg className="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>
		</section>
	);
};

export default HeroSection;