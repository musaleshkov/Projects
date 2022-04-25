import { FunctionComponent } from "react";
import { useMoralis } from "react-moralis";
import ContentBox from "./components/ContentBox/ContentBox";
import "./App.css";
import { Icon } from "@iconify/react";

const App: FunctionComponent = () => {
	const { authenticate, isAuthenticated } = useMoralis();

	return (
		<div className="App">
			{isAuthenticated && <ContentBox />}
			{!isAuthenticated && (
				<div
					className="authentication-button"
					onClick={() =>
						window.ethereum === undefined
							? window.open("https://metamask.io/", "_blank")
							: authenticate()
					}>
					<Icon className="icon" icon="logos:metamask-icon" />
					Connect to MetaMask
				</div>
			)}
		</div>
	);
};

export default App;
