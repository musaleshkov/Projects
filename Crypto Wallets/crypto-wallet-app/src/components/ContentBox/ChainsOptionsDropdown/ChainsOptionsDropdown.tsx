import { FunctionComponent, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { SUPPORTED_CHAINS } from "../../../Helpers/supported-chains";
import "./ChainsOptionsDropdown.css";

const ChainsOptionsDropdown: FunctionComponent = () => {
	const { enableWeb3, isWeb3Enabled } = useMoralis();
	const { switchNetwork, chain } = useChain();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const convertToHex = (value: number) => ethers.utils.hexValue(value);

	if (!isWeb3Enabled) {
		enableWeb3();
	}

	return (
		<div
			className="chains-options-dropdown-wrapper"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}>
			<div className="chains-options-dropdown-text">{chain?.name}</div>

			{isOpen && (
				<div
					className="chains-options-dropdown-list"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}>
					{SUPPORTED_CHAINS.map((chain) => (
						<div
							className="chains-options-dropdown-row"
							onClick={() => switchNetwork(convertToHex(chain.chainId))}>
							{chain.chainName}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ChainsOptionsDropdown;
