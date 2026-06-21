import { FunctionComponent, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "../../contexts/WalletContext";
import ChainsOptionsDropdown from "./ChainsOptionsDropdown/ChainsOptionsDropdown";
import TokenBalances from "./TokenBalances/TokenBalances";
import "./ContentBox.css";

const ContentBox: FunctionComponent = () => {
	const { account } = useWallet();
	const [copied, setCopied] = useState(false);

	const truncateAddress = (addr: string | null): string => {
		if (!addr) return "";
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	const handleCopy = useCallback(() => {
		if (!account) return;
		navigator.clipboard.writeText(account).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [account]);

	return (
		<div className="wallet-card">
			<div className="wallet-card__border" />

			<div className="wallet-card__header">
				<div className="wallet-card__label">Account</div>
				<ChainsOptionsDropdown />
			</div>

			<div className="wallet-card__address-row">
				<div className="wallet-card__network-badge">
					<div className="wallet-card__network-dot" />
					<span>MetaMask</span>
				</div>

				{account && (
					<button
						className={`wallet-card__copy-btn ${copied ? "wallet-card__copy-btn--copied" : ""}`}
						onClick={handleCopy}
						title="Copy address"
					>
						{copied ? (
							<Icon className="wallet-card__copy-icon" icon="ph:check-bold" />
						) : (
							<Icon className="wallet-card__copy-icon" icon="ph:copy-bold" />
						)}
					</button>
				)}
			</div>

			<div className="wallet-card__address-wrapper">
				<div className="wallet-card__address-avatar">
					{account ? account.slice(2, 4).toUpperCase() : "0x"}
				</div>
				<code className="wallet-card__address">{truncateAddress(account)}</code>
			</div>

			<div className="wallet-card__divider" />

			<TokenBalances />
		</div>
	);
};

export default ContentBox;