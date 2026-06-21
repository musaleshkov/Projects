import { FunctionComponent, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useMarketData } from "../../hooks/useMarketData";
import SearchBar from "./SearchBar";
import CoinRow from "./CoinRow";
import "./Market.css";

type SortKey = "rank" | "price" | "change" | "mcap";
type SortDir = "asc" | "desc";

const SKELETON_ROWS = 8;

const Market: FunctionComponent = () => {
	const { coins, isLoading, error, refetch } = useMarketData();
	const [search, setSearch] = useState("");
	const [sortKey, setSortKey] = useState<SortKey>("rank");
	const [sortDir, setSortDir] = useState<SortDir>("asc");

	const toggleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(key);
			setSortDir(key === "change" ? "desc" : "asc");
		}
	};

	const filteredCoins = useMemo(() => {
		const matched = search
			? coins.filter(
					(coin) =>
						coin.name.toLowerCase().includes(search.toLowerCase()) ||
						coin.symbol.toLowerCase().includes(search.toLowerCase()),
				)
			: coins;

		const sorted = [...matched];
		const dir = sortDir === "asc" ? 1 : -1;

		if (sortKey === "rank") sorted.sort((a, b) => (a.market_cap_rank - b.market_cap_rank) * dir);
		if (sortKey === "price") sorted.sort((a, b) => (a.current_price - b.current_price) * dir);
		if (sortKey === "change") sorted.sort((a, b) => (a.price_change_percentage_24h - b.price_change_percentage_24h) * dir);
		if (sortKey === "mcap") sorted.sort((a, b) => (a.market_cap - b.market_cap) * dir);

		return sorted;
	}, [coins, search, sortKey, sortDir]);

	const sortArrow = (key: SortKey) => {
		if (sortKey !== key) return "";
		return sortDir === "asc" ? " ↑" : " ↓";
	};

	// Loading skeletons
	if (isLoading) {
		return (
			<div className="market-card">
				<div className="market-card__border" />
				<div className="market-card__header-row">
					<h2 className="market-card__title">Market</h2>
					<span className="market-card__live-dot">
						<span className="market-card__live-dot-pulse" />
						Live
					</span>
				</div>
				<div className="market-card__search-wrapper">
					<SearchBar value={search} onChange={setSearch} />
				</div>
				<div className="market-card__list">
					{Array.from({ length: SKELETON_ROWS }).map((_, i) => (
						<div key={i} className="market-skeleton">
							<div className="market-skeleton__rank" />
							<div className="market-skeleton__asset">
								<div className="market-skeleton__icon" />
								<div>
									<div className="market-skeleton__text market-skeleton__text--name" />
									<div className="market-skeleton__text market-skeleton__text--symbol" />
								</div>
							</div>
							<div className="market-skeleton__text market-skeleton__text--spark" />
							<div className="market-skeleton__text market-skeleton__text--price" />
							<div className="market-skeleton__text market-skeleton__text--change" />
						</div>
					))}
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="market-card">
				<div className="market-card__border" />
				<div className="market-card__error">
					<Icon icon="ph:warning-circle-bold" className="market-card__error-icon" />
					<span className="market-card__error-text">{error}</span>
					<button className="market-card__retry-btn" onClick={refetch}>
						<Icon icon="ph:arrow-clockwise-bold" />
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="market-card">
			<div className="market-card__border" />

			{/* Header */}
			<div className="market-card__header-row">
				<h2 className="market-card__title">Market</h2>
				<span className="market-card__live-dot">
					<span className="market-card__live-dot-pulse" />
					Live
				</span>
			</div>

			{/* Search */}
			<div className="market-card__search-wrapper">
				<SearchBar value={search} onChange={setSearch} />
			</div>

			{/* Column headers */}
			<div className="coin-list__header">
				<button className="coin-list__header-label coin-list__header-label--rank coin-list__header-sort" onClick={() => toggleSort("rank")}>
					#{sortArrow("rank")}
				</button>
				<span className="coin-list__header-label coin-list__header-label--asset">Asset</span>
				<span className="coin-list__header-label coin-list__header-label--spark">7D</span>
				<button className="coin-list__header-label coin-list__header-label--price coin-list__header-sort" onClick={() => toggleSort("price")}>
					Price{sortArrow("price")}
				</button>
				<button className="coin-list__header-label coin-list__header-label--change coin-list__header-sort" onClick={() => toggleSort("change")}>
					24h{sortArrow("change")}
				</button>
				<button className="coin-list__header-label coin-list__header-label--mcap coin-list__header-sort" onClick={() => toggleSort("mcap")}>
					MCap{sortArrow("mcap")}
				</button>
			</div>

			{/* Coin list */}
			<div className="market-card__list">
				{filteredCoins.length === 0 ? (
					<div className="market-card__empty">
						<span>No coins found for "{search}"</span>
					</div>
				) : (
					filteredCoins.map((coin, i) => (
						<div key={coin.id} style={{ animation: `fadeInUp 0.3s ease ${i * 0.02}s both` }}>
							<CoinRow coin={coin} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Market;