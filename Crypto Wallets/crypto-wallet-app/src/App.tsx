import { FunctionComponent, useState } from "react";
import { useWallet } from "./contexts/WalletContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import TabBar from "./components/TabBar/TabBar";
import ContentBox from "./components/ContentBox/ContentBox";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import Market from "./components/Market/Market";
import "./App.css";

const App: FunctionComponent = () => {
	const { isConnected } = useWallet();
	const [activeTab, setActiveTab] = useState<"wallet" | "market">("wallet");

	return (
		<div className="App">
			<header className="app-header">
				<h1 className="app-title">Crypto Wallet</h1>
				<p className="app-subtitle">
					{activeTab === "wallet"
						? "View your balances across multiple chains"
						: "Live cryptocurrency prices from CoinGecko"}
				</p>
			</header>

			<main className="app-content">
				<TabBar activeTab={activeTab} onTabChange={setActiveTab} />

				<ErrorBoundary>
					{activeTab === "wallet" ? (
						isConnected ? (
							<ContentBox />
						) : (
							<ConnectButton />
						)
					) : (
						<Market />
					)}
				</ErrorBoundary>
			</main>
		</div>
	);
};

export default App;