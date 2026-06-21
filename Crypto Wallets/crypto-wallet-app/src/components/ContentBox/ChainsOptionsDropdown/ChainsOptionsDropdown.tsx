import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import { SUPPORTED_CHAINS } from "../../../constants/supported-chains";
import { convertToHex } from "../../../utils/chain";
import "./ChainsOptionsDropdown.css";

const ChainsOptionsDropdown: FunctionComponent = () => {
	const { enableWeb3, isWeb3Enabled } = useMoralis();
	const { switchNetwork, chain } = useChain();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const hasEnabledWeb3 = useRef(false);

	useEffect(() => {
		if (!isWeb3Enabled && !hasEnabledWeb3.current) {
			hasEnabledWeb3.current = true;
			enableWeb3();
		}
	}, [isWeb3Enabled, enableWeb3]);

	const handleChainSwitch = (chainId: number) => {
		switchNetwork(convertToHex(chainId));
	};

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
					{SUPPORTED_CHAINS.map((supportedChain) => (
						<div
							key={supportedChain.chainId}
							className="chains-options-dropdown-row"
							onClick={() => handleChainSwitch(supportedChain.chainId)}>
							{supportedChain.chainName}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ChainsOptionsDropdown;
