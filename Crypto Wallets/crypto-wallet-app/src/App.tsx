import { FunctionComponent, useState, Suspense, lazy } from "react";
import { useWallet } from "./contexts/WalletContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import TabBar from "./components/TabBar/TabBar";
import ContentBox from "./components/ContentBox/ContentBox";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import "./App.css";

const Market = lazy(() => import("./components/Market/Market"));

const MarketFallback = () => (
	<div className="market-card">
		<div className="market-card__border" /> 
		<div className="market-card__header-row">
			<h2 className="market-card__title">Market</h2>
		</div>
		<div className="market-card__list">
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="market-skeleton">
					<div className="market-skeleton__rank" />
					<div className="market-skeleton__asset">
						<div className="market-skeleton__icon" />
						<div>
							<div className="market-skeleton__text market-skeleton__text--name" />
							<div className="market-skeleton__text market-skeleton__text--symbol" />
						</div>
					</div>
					<div className="market-skeleton__text market-skeleton__text--spark" />
					<div className="market-skeleton__text market-skeleton__text--price" />
					<div className="market-skeleton__text market-skeleton__text--change" />
				</div>
			))}
		</div>
	</div>
);

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

				<ErrorBoundary key={activeTab}>
					{activeTab === "wallet" ? (
						isConnected ? <ContentBox /> : <ConnectButton />
					) : (
						<Suspense fallback={<MarketFallback />}>
							<Market />
						</Suspense>
					)}
				</ErrorBoundary>
			</main>
		</div>
	);
};

export default App;