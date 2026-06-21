import { FunctionComponent, memo, useMemo } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { useNativePrice } from "../../hooks/useNativePrice";
import "./PortfolioValue.css";

const PortfolioValue: FunctionComponent = memo(() => {
	const { chainId, nativeBalance } = useWallet();
	const { price: nativePrice } = useNativePrice(chainId);

	const portfolioUSD = useMemo(() => {
		if (!nativePrice || !nativeBalance) return null;
		return (Number(nativeBalance) * nativePrice).toFixed(2);
	}, [nativePrice, nativeBalance]);

	if (!portfolioUSD) return null;

	return (
		<div className="portfolio-value" style={{ animation: "fadeInUp 0.4s ease 0.2s both" }}>
			<span className="portfolio-value__label">Portfolio Value</span>
			<span className="portfolio-value__amount">${portfolioUSD}</span>
		</div>
	);
});

export default PortfolioValue;