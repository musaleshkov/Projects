import { type ReactElement, type FC } from "react";
import FooterSection from "@/components/Footer/FooterSection";
import InfoSection from "@/components/InfoSection/InfoSection";
import HeroSection from "@/components/HeroSection/HeroSection";

interface LandingPageProps {
	onStartQuiz: () => void;
}

const LandingPage: FC<LandingPageProps> = ({
	onStartQuiz,
}: LandingPageProps): ReactElement => {
	return (
		<main className="w-full overflow-x-hidden">
			<HeroSection onStartQuiz={onStartQuiz} />
			<InfoSection />
			<FooterSection />
		</main>
	);
};

export default LandingPage;
