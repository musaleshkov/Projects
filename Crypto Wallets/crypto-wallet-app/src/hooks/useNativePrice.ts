import { useState, useEffect, useRef } from "react";

interface CoinGeckoPrice {
	usd: number;
}

interface PriceMap { 
	[key: string]: CoinGeckoPrice;
}

const NATIVE_COINGECKO_IDS: Record<number, string> = {
	1: "ethereum",
	137: "matic-network",
	56: "binancecoin",
	97: "binancecoin",
};

const CACHE = new Map<string, { price: number; timestamp: number }>();
const CACHE_TTL = 60000;

export const useNativePrice = (chainId: number | null) => {
	const [price, setPrice] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		const coingeckoId = chainId ? NATIVE_COINGECKO_IDS[chainId] : null;

		if (!coingeckoId) {
			setPrice(null);
			return;
		}

		// Check cache first
		const cached = CACHE.get(coingeckoId);
		if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
			setPrice(cached.price);
			return;
		}

		const controller = new AbortController();
		setIsLoading(true);

		fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
			{ signal: controller.signal },
		)
			.then((res) => res.json())
			.then((data: PriceMap) => {
				if (mountedRef.current) {
					const usdPrice = data[coingeckoId]?.usd ?? null;
					setPrice(usdPrice);
					setIsLoading(false);
					if (usdPrice) {
						CACHE.set(coingeckoId, { price: usdPrice, timestamp: Date.now() });
					}
				}
			})
			.catch((err) => {
				if ((err as Error).name === "AbortError") return;
				if (mountedRef.current) {
					setPrice(null);
					setIsLoading(false);
				}
			});

		return () => {
			mountedRef.current = false;
			controller.abort();
		};
	}, [chainId]);

	return { price, isLoading };
};