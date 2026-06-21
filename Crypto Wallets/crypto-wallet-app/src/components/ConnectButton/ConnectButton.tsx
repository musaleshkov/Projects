import { FunctionComponent } from "react";
import { useMoralis } from "react-moralis";
import { Icon } from "@iconify/react";
import "./ConnectButton.css";

const ConnectButton: FunctionComponent = () => {
	const { authenticate } = useMoralis();

	const handleConnect = () => {
		if (window.ethereum === undefined) {
			window.open("https://metamask.io/", "_blank");
		} else {
			authenticate();
		}
	};

	return (
		<div className="authentication-button" onClick={handleConnect}>
			<Icon className="icon" icon="logos:metamask-icon" />
			Connect to MetaMask
		</div>
	);
};

export default ConnectButton;