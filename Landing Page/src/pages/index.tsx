import dynamic from "next/dynamic";
import { fetchQuizData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { QuizData } from "@/types/quiz";
import { ComponentType, ReactElement, FunctionComponent, useState } from "react";
import { QuizProps } from "@/components/Quiz/Quiz";
import LandingPage from "@/pages/LandingPage";
import { useTranslation } from "react-i18next";

const LoadingQuiz: FunctionComponent = (): ReactElement => {
	const { t } = useTranslation();
	return (<p>{t("loadingQuiz")}</p>);
};

const Quiz: ComponentType<QuizProps> = dynamic(() => import("@/components/Quiz/Quiz"), {
	ssr: false,
	loading: (): ReactElement => <LoadingQuiz/>,
});

const Home: FunctionComponent = (): ReactElement => {
	const [quizStarted, setQuizStarted] = useState(false);
	const { t } = useTranslation();

	const { data, isLoading, error } = useQuery<QuizData>({
		queryKey: ["quizData"],
		queryFn: fetchQuizData,
		retry: 2,
		staleTime: 1000 * 60 * 5,
	});

	const handleGoBackToLanding: () => void = (): void => setQuizStarted(false);

	if (isLoading) return <p>{t("loadingHomePage")}</p>;
	if (error) return <p>{t("ErrorLoadingQuizData")}: {error.message}</p>;

	return (
		<>
			{!quizStarted ? (
				<LandingPage onStartQuiz={(): void => setQuizStarted(true)}/>
			) : (
				<Quiz quizData={data} onGoBackToLanding={handleGoBackToLanding}/>
			)}
		</>
	);
};

export default Home;
