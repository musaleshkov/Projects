import { FunctionComponent } from "react";
import "./TabBar.css";

interface TabBarProps {
	activeTab: "wallet" | "market";
	onTabChange: (tab: "wallet" | "market") => void;
}

const TabBar: FunctionComponent<TabBarProps> = ({ activeTab, onTabChange }) => {
	return (
		<div className="tab-bar">
			<button
				className={`tab-bar__tab ${activeTab === "wallet" ? "tab-bar__tab--active" : ""}`}
				onClick={() => onTabChange("wallet")}
			>
				Wallet
				{activeTab === "wallet" && <div className="tab-bar__indicator" />}
			</button>
			<button 
				className={`tab-bar__tab ${activeTab === "market" ? "tab-bar__tab--active" : ""}`}
				onClick={() => onTabChange("market")}
			>
				Market
				{activeTab === "market" && <div className="tab-bar__indicator" />}
			</button>
		</div>
	);
};

export default TabBar;