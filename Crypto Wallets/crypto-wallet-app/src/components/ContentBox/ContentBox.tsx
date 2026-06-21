import { FunctionComponent, useState, useCallback, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "../../contexts/WalletContext";
import { useToast } from "../Toast/Toast";
import { useNativePrice } from "../../hooks/useNativePrice";
import ChainsOptionsDropdown from "./ChainsOptionsDropdown/ChainsOptionsDropdown";
import TokenBalances from "./TokenBalances/TokenBalances";
import "./ContentBox.css";

const ContentBox: FunctionComponent = () => {
	const { account, chainId, nativeBalance } = useWallet();
	const { addToast } = useToast();
	const { price: nativePrice } = useNativePrice(chainId);
	const [copied, setCopied] = useState(false);
	const [visible, setVisible] = useState(false);

	// Staggered entrance
	useEffect(() => {
		const t = setTimeout(() => setVisible(true), 50);
		return () => clearTimeout(t);
	}, []);

	const truncateAddress = (addr: string | null): string => {
		if (!addr) return "";
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	const handleCopy = useCallback(() => {
		if (!account) return;
		navigator.clipboard.writeText(account).then(() => {
			setCopied(true);
			addToast("Address copied to clipboard", "success");
			setTimeout(() => setCopied(false), 2000);
		});
	}, [account, addToast]);

	// USD portfolio value
	const portfolioUSD = useMemo(() => {
		if (!nativePrice || !nativeBalance) return null;
		return (Number(nativeBalance) * nativePrice).toFixed(2);
	}, [nativePrice, nativeBalance]);

	const handleSend = () => {
		if (account && window.ethereum) {
			addToast("Opening wallet...", "info");
		}
	};

	const handleReceive = () => {
		if (account) {
			navigator.clipboard.writeText(account).then(() => {
				addToast("Address copied for receiving", "success");
			});
		}
	};

	const handleSwap = () => {
		const swapUrls: Record<number, string> = {
			1: "https://app.uniswap.org/swap",
			137: "https://app.uniswap.org/swap",
			56: "https://pancakeswap.finance/swap",
		};
		const url = chainId ? swapUrls[chainId] : null;
		if (url) {
			window.open(url, "_blank");
			addToast("Opening swap in new tab", "info");
		} else {
			addToast("Swap not available for this chain", "info");
		}
	};

	return (
		<div className={`wallet-card ${visible ? "wallet-card--visible" : ""}`}>
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

			{/* Portfolio USD */}
			{portfolioUSD && (
				<div className="wallet-card__portfolio" style={visible ? { animationDelay: "0.1s" } : undefined}>
					<span className="wallet-card__portfolio-label">Portfolio Value</span>
					<span className="wallet-card__portfolio-value">${portfolioUSD}</span>
				</div>
			)}

			{/* Quick Actions */}
			<div className={`wallet-card__actions ${visible ? "wallet-card__actions--visible" : ""}`}>
				<button className="wallet-card__action-btn" onClick={handleSend}>
					<div className="wallet-card__action-icon-wrapper">
						<Icon className="wallet-card__action-icon" icon="ph:paper-plane-tilt-bold" />
					</div>
					<span>Send</span>
				</button>
				<button className="wallet-card__action-btn" onClick={handleReceive}>
					<div className="wallet-card__action-icon-wrapper">
						<Icon className="wallet-card__action-icon" icon="ph:qrcode-bold" />
					</div>
					<span>Receive</span>
				</button>
				<button className="wallet-card__action-btn" onClick={handleSwap}>
					<div className="wallet-card__action-icon-wrapper">
						<Icon className="wallet-card__action-icon" icon="ph:arrows-left-right-bold" />
					</div>
					<span>Swap</span>
				</button>
			</div>

			<div className="wallet-card__divider" />

			<TokenBalances />
		</div>
	);
};

export default ContentBox;