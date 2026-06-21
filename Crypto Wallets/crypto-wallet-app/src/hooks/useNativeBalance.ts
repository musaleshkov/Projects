import { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";

interface NativeBalanceResult {
	balance: string;
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
}

export const useNativeBalance = (): NativeBalanceResult => {
	const { Moralis } = useMoralis();
	const { account } = useChain();
	const [balance, setBalance] = useState<string>("0");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchBalance = async () => {
		if (!account || !Moralis) {
			setIsLoading(false);
			return;
		}

		let cancelled = false;

		try {
			setIsLoading(true);
			setError(null);
			const provider = await Moralis.web3Library.providers.getDefaultProvider();
			const raw = await provider.getBalance(account, "latest");
			if (!cancelled) {
				const formatted = Moralis.Units?.FromWei(raw);
				setBalance(formatted || "0");
			}
		} catch (err) {
			if (!cancelled) {
				setError(err instanceof Error ? err : new Error("Failed to fetch native balance"));
			}
		} finally {
			if (!cancelled) {
				setIsLoading(false);
			}
		}

		return () => {
			cancelled = true;
		};
	};

	useEffect(() => {
		const cleanup = fetchBalance();
		return cleanup;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, Moralis]);

	return { balance, isLoading, error, refetch: fetchBalance };
};
