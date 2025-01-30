import { ReactElement, FunctionComponent } from "react";
import { Container } from "@/styles/CommonStyles";
import FooterSection from "@/components/Footer/FooterSection";
import InfoSection from "@/components/InfoSection/InfoSection";
import HeroSection from "@/components/HeroSection/HeroSection";

interface LandingPageProps {
	onStartQuiz: () => void;
}

const LandingPage: FunctionComponent<LandingPageProps> = ({ onStartQuiz }: LandingPageProps): ReactElement => {
	return (
		<Container role="main">
			<HeroSection onStartQuiz={onStartQuiz}/>
			<InfoSection/>
			<FooterSection/>
		</Container>
	);
};

export default LandingPage;
