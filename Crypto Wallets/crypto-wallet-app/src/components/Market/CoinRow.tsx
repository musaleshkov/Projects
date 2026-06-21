import { FunctionComponent, memo } from "react";
import { CoinData } from "../../types";
import { formatLargeNumber, formatPrice } from "../../utils/market";
import "./CoinRow.css";

interface CoinRowProps {
	coin: CoinData;
}

const CoinRow: FunctionComponent<CoinRowProps> = memo(({ coin }) => {
	const isPositive = coin.price_change_percentage_24h >= 0;

	return (
		<div className="coin-row"> 
			<span className="coin-row__rank">#{coin.market_cap_rank}</span>
			<div className="coin-row__asset">
				<img className="coin-row__image" src={coin.image} alt={coin.name} loading="lazy" />
				<div className="coin-row__names">
					<span className="coin-row__name">{coin.name}</span>
					<span className="coin-row__symbol">{coin.symbol.toUpperCase()}</span>
				</div>
			</div>
			<div className="coin-row__sparkline">
				<SparklineSVG prices={coin.sparkline_in_7d?.price || []} isPositive={isPositive} />
			</div>
			<span className="coin-row__price">{formatPrice(coin.current_price)}</span>
			<span className={`coin-row__change ${isPositive ? "coin-row__change--up" : "coin-row__change--down"}`}>
				{isPositive ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2) || "0.00"}%
			</span>
			<span className="coin-row__marketcap">{formatLargeNumber(coin.market_cap)}</span>
		</div>
	);
});

const SparklineSVG: FunctionComponent<{ prices: number[]; isPositive: boolean }> = memo(({ prices, isPositive }) => {
	if (prices.length < 2) return <div className="coin-row__sparkline-empty" />;
	const width = 100, height = 32, padding = 2;
	const min = Math.min(...prices), max = Math.max(...prices), range = max - min || 1;
	const points = prices.map((p, i) => {
		const x = padding + (i / (prices.length - 1)) * (width - padding * 2);
		const y = height - padding - ((p - min) / range) * (height - padding * 2);
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	}).join(" ");
	return (
		<svg className="coin-row__sparkline-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
			<polyline fill="none" stroke={isPositive ? "#3fb950" : "#f85149"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
		</svg>
	);
});

export default CoinRow;