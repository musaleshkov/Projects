import { FunctionComponent, useState } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "../../contexts/WalletContext";
import "./ConnectButton.css";

const ConnectButton: FunctionComponent = () => {
	const { connect, isConnecting } = useWallet();
	const [isLoading, setIsLoading] = useState(false);

	const handleConnect = async () => {
		setIsLoading(true);
		try {
			await connect();
		} catch {
			// User rejected or error — handled in context
		} finally {
			setIsLoading(false);
		}
	};

	const showLoading = isLoading || isConnecting;

	return (
		<button
			className={`connect-button ${showLoading ? "connect-button--loading" : ""}`}
			onClick={handleConnect}
			disabled={showLoading}
		>
			<div className="connect-button__content">
				{showLoading ? (
					<div className="connect-button__spinner" />
				) : (
					<Icon className="connect-button__icon" icon="logos:metamask-icon" />
				)}
				<span>{showLoading ? "Connecting..." : "Connect Wallet"}</span>
			</div>
			<div className="connect-button__glow" />
		</button>
	);
};

export default ConnectButton;