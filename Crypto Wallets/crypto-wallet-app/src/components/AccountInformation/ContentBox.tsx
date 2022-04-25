import { FunctionComponent } from "react";
import { useChain } from "react-moralis";
import ChainsComponent from "../ContentBox/ChainsOptionsDropdown/ChainsOptionsDropdown";
import TokenBalances from "../ContentBox/TokenBalances/TokenBalances";
import "./AccountInformation.css";

const AccountInformation: FunctionComponent = () => {
	const { account } = useChain();

	return (
		<div className="account-information-wrapper">
			<div className="account-information-header">
				<div>Account </div>
				<ChainsComponent />
			</div>

			<div className="account-information-content-wrapper">
				<div className="account-information-sub-text">Connected with MetaMask</div>
				<div className="account-information-address"> {account} </div>
			</div>
			<TokenBalances />
		</div>
	);
};

export default AccountInformation;
