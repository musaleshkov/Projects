import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "../../../contexts/WalletContext";
import { SUPPORTED_CHAINS } from "../../../constants/supported-chains";
import { getChainName } from "../../../utils/chain";
import "./ChainsOptionsDropdown.css";

const CHAIN_ICONS: Record<number, string> = {
	1: "logos:ethereum",
	56: "logos:binance-smart-chain",
	137: "logos:polygon",
	43114: "logos:avalanche",
	10: "logos:optimism",
	42161: "logos:arbitrum",
	250: "logos:fantom",
};

const ChainsOptionsDropdown: FunctionComponent = () => {
	const { switchChain, chainId } = useWallet();

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleChainSwitch = (targetChainId: number) => {
		switchChain(targetChainId);
		setIsOpen(false);
	};

	const activeChain = SUPPORTED_CHAINS.find((c) => c.chainId === chainId);
	const activeIcon = activeChain ? CHAIN_ICONS[activeChain.chainId] : null;
	const displayName = chainId ? getChainName(chainId) : "Select Chain";

	return (
		<div className="chain-dropdown" ref={dropdownRef}>
			<button
				className={`chain-dropdown__trigger ${isOpen ? "chain-dropdown__trigger--open" : ""}`}
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				{activeIcon && <Icon className="chain-dropdown__chain-icon" icon={activeIcon} />}
				<span className="chain-dropdown__name">{displayName}</span>
				<Icon
					className={`chain-dropdown__chevron ${isOpen ? "chain-dropdown__chevron--open" : ""}`}
					icon="ph:caret-down-bold"
				/>
			</button>

			{isOpen && (
				<div className="chain-dropdown__menu">
					<div className="chain-dropdown__menu-header">Select Network</div>
					{SUPPORTED_CHAINS.map((supportedChain) => (
						<button
							key={supportedChain.chainId}
							className={`chain-dropdown__item ${
								supportedChain.chainId === chainId
									? "chain-dropdown__item--active"
									: ""
							}`}
							onClick={() => handleChainSwitch(supportedChain.chainId)}
							type="button"
						>
							<div className="chain-dropdown__item-left">
								{CHAIN_ICONS[supportedChain.chainId] ? (
									<Icon
										className="chain-dropdown__item-icon"
										icon={CHAIN_ICONS[supportedChain.chainId]}
									/>
								) : (
									<div className="chain-dropdown__item-dot" />
								)}
								<span>{supportedChain.chainName}</span>
							</div>
							{supportedChain.chainId === chainId && (
								<div className="chain-dropdown__active-indicator" />
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ChainsOptionsDropdown;