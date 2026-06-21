import dynamic from "next/dynamic";
import { fetchQuizData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import type { QuizData } from "@/types/quiz";
import { type ComponentType, type ReactElement, type FC, useState, useCallback } from "react";
import type { QuizProps } from "@/components/Quiz/Quiz";
import LandingPage from "@/pages/LandingPage";
import { Skeleton } from "@/components/Skeleton";
import { useTranslation } from "react-i18next";

const QuizLoadingFallback: FC = (): ReactElement => (
	<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
		<Skeleton variant="rectangular" width="100%" height="48px" />
		<Skeleton variant="text" width="60%" />
		<div className="flex gap-4 mt-8">
			<Skeleton variant="rectangular" width="120px" height="44px" />
			<Skeleton variant="rectangular" width="120px" height="44px" />
		</div>
	</div>
);

const Quiz: ComponentType<QuizProps> = dynamic(
	() => import("@/components/Quiz/Quiz"),
	{
		ssr: false,
		loading: (): ReactElement => <QuizLoadingFallback />,
	},
);

const Home: FC = (): ReactElement => {
	const [quizStarted, setQuizStarted] = useState(false);
	const [transitioning, setTransitioning] = useState(false);
	const { t } = useTranslation();

	const { data, isLoading, error } = useQuery<QuizData>({
		queryKey: ["quizData"],
		queryFn: fetchQuizData,
		retry: 2,
		staleTime: 1000 * 60 * 5,
	});

	const handleStartQuiz = useCallback((): void => {
		setTransitioning(true);
		setTimeout(() => {
			setQuizStarted(true);
			setTransitioning(false);
		}, 300);
	}, []);

	const handleGoBackToLanding = useCallback((): void => {
		setTransitioning(true);
		setTimeout(() => {
			setQuizStarted(false);
			setTransitioning(false);
		}, 300);
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
				<Skeleton variant="circular" width="80px" height="80px" />
				<Skeleton variant="text" width="40%" />
				<Skeleton variant="text" width="25%" />
			</div>
		);
	}

	if (error)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p>
					{t("ErrorLoadingQuizData")}: {error.message}
				</p>
			</div>
		);

	return (
		<div className={transitioning ? "page-transition-exit" : "page-transition-enter"}>
			{!quizStarted ? (
				<LandingPage onStartQuiz={handleStartQuiz} />
			) : (
				<Quiz quizData={data} onGoBackToLanding={handleGoBackToLanding} />
			)}
		</div>
	);
};

export default Home;