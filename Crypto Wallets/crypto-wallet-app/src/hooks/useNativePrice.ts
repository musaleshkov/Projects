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

		let cancelled = false;
		setIsLoading(true);

		fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
		)
			.then((res) => res.json())
			.then((data: PriceMap) => {
				if (!cancelled && mountedRef.current) {
					setPrice(data[coingeckoId]?.usd ?? null);
					setIsLoading(false);
				}
			})
			.catch(() => {
				if (!cancelled && mountedRef.current) {
					setPrice(null);
					setIsLoading(false);
				}
			});

		return () => {
			cancelled = true;
			mountedRef.current = false;
		};
	}, [chainId]);

	return { price, isLoading };
};