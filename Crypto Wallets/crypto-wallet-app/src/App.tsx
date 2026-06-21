import { FunctionComponent } from "react";
import { useMoralis } from "react-moralis";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ContentBox from "./components/ContentBox/ContentBox";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import "./App.css";

const App: FunctionComponent = () => {
	const { isAuthenticated } = useMoralis();

	return (
		<div className="App">
			<ErrorBoundary>
				{isAuthenticated ? <ContentBox /> : <ConnectButton />}
			</ErrorBoundary>
		</div>
	);
};

export default App;
