import { FunctionComponent } from "react";
import { useChain } from "react-moralis";
import ChainsOptionsDropdown from "./ChainsOptionsDropdown/ChainsOptionsDropdown";
import TokenBalances from "./TokenBalances/TokenBalances";
import "./ContentBox.css";

const ContentBox: FunctionComponent = () => {
	const { account } = useChain();

	return (
		<div className="content-box-wrapper">
			<div className="content-box-header">
				<div>Account </div>
				<ChainsOptionsDropdown />
			</div>

			<div className="content-box-content-wrapper">
				<div className="content-box-sub-text">Connected with MetaMask</div>
				<div className="content-box-address"> {account} </div>
			</div>
			<TokenBalances />
		</div>
	);
};

export default ContentBox;
