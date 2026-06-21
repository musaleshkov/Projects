import { useEffect, useCallback, type ReactElement, type FC } from "react";
import type { QuizOption } from "@/types/quiz";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@/styles/CommonStyles";

interface ResultProps {
	answers: QuizOption[];
	onRestart: () => void;
	onGoBackToLanding: () => void;
}

const CONFETTI_COLORS = ["#1088e9", "#10b981", "#f59e0b", "#e06150", "#8b5cf6", "#ec4899"];

const Result: FC<ResultProps> = ({
	answers,
	onRestart,
	onGoBackToLanding,
}: ResultProps): ReactElement => {
	const { t } = useTranslation();
	const hasRejection = answers?.some(
		(answer: QuizOption): boolean => answer?.isRejection,
	);

	const spawnConfetti = useCallback((): void => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion || hasRejection) return;

		for (let i = 0; i < 80; i++) {
			const piece = document.createElement("div");
			piece.className = "confetti-piece";
			piece.style.left = `${Math.random() * 100}%`;
			piece.style.animationDuration = `${2 + Math.random() * 3}s`;
			piece.style.animationDelay = `${Math.random() * 2}s`;
			piece.style.background =
				CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
			piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
			piece.style.width = `${6 + Math.random() * 8}px`;
			piece.style.height = `${6 + Math.random() * 8}px`;
			document.body.appendChild(piece);

			setTimeout(() => piece.remove(), 5000);
		}
	}, [hasRejection]);

	useEffect(() => {
		spawnConfetti();
	}, [spawnConfetti]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-white px-6">
			<div className="max-w-lg w-full text-center animate-scale-in">
				{/* Icon */}
				<div
					className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
						hasRejection ? "bg-accent-100" : "bg-success/10"
					}`}
				>
					{hasRejection ? (
						<svg
							className="w-12 h-12 text-accent-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					) : (
						<svg
							className="w-12 h-12 text-success"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					)}
				</div>

				{/* Title */}
				<h2
					className={`text-3xl sm:text-4xl font-bold mb-4 ${
						hasRejection ? "text-accent-600" : "text-success"
					}`}
				>
					{hasRejection ? t("resultRejected") : t("resultSuccess")}
				</h2>

				{/* Description */}
				<p className="text-secondary-600 text-lg mb-10 leading-relaxed">
					{hasRejection
						? t("resultRejectedDescription")
						: t("resultSuccessDescription")}
				</p>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<PrimaryButton
						onClick={onRestart}
						aria-label="Restart the quiz"
						data-cy="restart-quiz-button"
						className="btn-hover"
					>
						{t("restartButton")}
					</PrimaryButton>
					<PrimaryButton
						onClick={onGoBackToLanding}
						aria-label="Go back to the landing page"
						data-cy="go-back-button"
						className="bg-secondary-100 text-foreground hover:bg-secondary-200 btn-hover"
					>
						{t("goBackToTheLandingPage")}
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default Result;