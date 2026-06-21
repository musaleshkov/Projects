import { useState, useEffect, useCallback, useRef } from "react";
import { CoinData } from "../types";

const COINGECKO_URL =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h";

const REFRESH_INTERVAL = 60000;

export const useMarketData = () => {
	const [coins, setCoins] = useState<CoinData[]>([]); 
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const mountedRef = useRef(true);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const fetchCoins = useCallback(async () => {
		const controller = new AbortController();

		try {
			const res = await fetch(COINGECKO_URL, { signal: controller.signal });
			if (!res.ok) throw new Error(`API error: ${res.status}`);
			const data: CoinData[] = await res.json();
			if (mountedRef.current) {
				setCoins(data);
				setError(null);
				setIsLoading(false);
			}
		} catch (err) {
			if ((err as Error).name === "AbortError") return;
			if (mountedRef.current) {
				setError(err instanceof Error ? err.message : "Failed to fetch market data");
				setIsLoading(false);
			}
		}

		return () => controller.abort();
	}, []);

	useEffect(() => {
		mountedRef.current = true;
		fetchCoins();

		intervalRef.current = setInterval(fetchCoins, REFRESH_INTERVAL);

		return () => {
			mountedRef.current = false;
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [fetchCoins]);

	return { coins, isLoading, error, refetch: fetchCoins };
};