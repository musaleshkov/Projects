import { FunctionComponent } from "react";
import { useWallet } from "./contexts/WalletContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ContentBox from "./components/ContentBox/ContentBox";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import "./App.css";

const App: FunctionComponent = () => {
	const { isConnected } = useWallet();

	return (
		<div className="App">
			<header className="app-header">
				<h1 className="app-title">Crypto Wallet</h1>
				<p className="app-subtitle">View your balances across multiple chains</p>
			</header>

			<main className="app-content">
				<ErrorBoundary>
					{isConnected ? <ContentBox /> : <ConnectButton />}
				</ErrorBoundary>
			</main>
		</div>
	);
};

export default App;