import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Contract, formatUnits } from "ethers";
import { Icon } from "@iconify/react";
import { useWallet } from "../../../contexts/WalletContext";
import { TokenBalanceItem } from "../../../types";
import { erc20ABI } from "../../../abi/erc20-abi";
import { getNativeSymbol, getNativeIcon } from "../../../utils/chain";
import TokenBalanceRow from "./TokenBalanceRow/TokenBalanceRow";
import "./TokenBalances.css";

const SKELETON_COUNT = 4;
const LOADING_TIMEOUT_MS = 25000;

interface TokenInfo {
	symbol: string;
	address: string;
	decimals: number;
}

// Curated list of known tokens per chain (chainId -> tokens)
const KNOWN_TOKENS: Record<number, TokenInfo[]> = {
	1: [
		{ symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
		{ symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
		{ symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 },
		{ symbol: "UNI", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", decimals: 18 },
		{ symbol: "LINK", address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", decimals: 18 },
	],
	137: [
		{ symbol: "USDT", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
		{ symbol: "USDC", address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", decimals: 6 },
	],
	56: [
		{ symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
		{ symbol: "USDC", address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
	],
	97: [],
};

const TokenBalances: FunctionComponent = () => {
	const { signer, account, chainId, nativeBalance, isLoadingBalance, balanceError } = useWallet();
	const [tokens, setTokens] = useState<TokenBalanceItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [timedOut, setTimedOut] = useState(false);
	const fetchIdRef = useRef(0);
	const hasFetchedRef = useRef(false);

	const fetchBalances = useCallback(async () => {
		if (!signer || !account) {
			setIsLoading(false);
			return;
		}

		const fetchId = ++fetchIdRef.current;
		setIsLoading(true);
		setError(null);
		setTimedOut(false);

		const chainTokens = KNOWN_TOKENS[chainId ?? 0] || [];
		if (chainTokens.length === 0) {
			if (fetchId === fetchIdRef.current) {
				setTokens([]);
				setIsLoading(false);
			}
			return;
		}

		const results: TokenBalanceItem[] = [];

		for (const token of chainTokens) {
			try {
				const contract = new Contract(token.address, erc20ABI, signer);
				const balance = await contract.balanceOf(account);
				const formatted = formatUnits(balance, token.decimals);

				if (Number(formatted) > 0) {
					results.push({
						symbol: token.symbol,
						balance: Number(formatted).toFixed(4),
						decimals: token.decimals,
						tokenAddress: token.address,
					});
				}
			} catch {
				// Skip individual token failures
			}
		}

		if (fetchId === fetchIdRef.current) {
			setTokens(results);
			setIsLoading(false);
		}
	}, [signer, account, chainId]);

	useEffect(() => {
		if (signer && account && !hasFetchedRef.current) {
			hasFetchedRef.current = true;
			fetchBalances();
		}
	}, [signer, account, fetchBalances]);

	// Refetch when chain changes
	useEffect(() => {
		if (signer && account) {
			hasFetchedRef.current = true;
			fetchBalances();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);

	// Timeout safety
	useEffect(() => {
		if (!isLoading) return;
		const timer = setTimeout(() => {
			if (isLoading) setTimedOut(true);
		}, LOADING_TIMEOUT_MS);
		return () => clearTimeout(timer);
	}, [isLoading]);

	const showLoading = !timedOut && (isLoading || isLoadingBalance);
	const hasTokenError = error || (timedOut ? "Loading timed out" : null);

	// Skeleton state
	if (showLoading) {
		return (
			<div className="token-balance-wrapper">
				{Array.from({ length: SKELETON_COUNT }).map((_, i) => (
					<div key={i} className="token-skeleton">
						<div className="token-skeleton__icon" />
						<div className="token-skeleton__info">
							<div className="token-skeleton__text token-skeleton__text--name" />
							<div className="token-skeleton__text token-skeleton__text--decimals" />
						</div>
						<div className="token-skeleton__text token-skeleton__text--balance" />
					</div>
				))}
			</div>
		);
	}

	// Error state
	if (hasTokenError || balanceError) {
		const message = hasTokenError || balanceError || "Unknown error";
		return (
			<div className="token-balance-wrapper">
				<div className="token-balance-state token-balance-error">
					<Icon icon="ph:warning-circle-bold" style={{ fontSize: "1.5rem", margin: "0 auto 0.5rem", display: "block" }} />
					<div>Failed to load balances</div>
					<div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>{message}</div>
				</div>
			</div>
		);
	}

	// Empty state
	if (tokens.length === 0 && Number(nativeBalance) === 0) {
		return (
			<div className="token-balance-empty">
				<Icon className="token-balance-empty__icon" icon="ph:wallet-bold" />
				<span className="token-balance-empty__text">No tokens found</span>
				<span className="token-balance-empty__subtext">
					Your wallet has no tokens on this chain
				</span>
			</div>
		);
	}

	return (
		<div className="token-balance-wrapper">
			{tokens.map((token) => (
				<TokenBalanceRow
					key={token.tokenAddress || token.symbol}
					symbol={token.symbol}
					balance={token.balance}
					decimals={token.decimals}
				/>
			))}

			{Number(nativeBalance) > 0 && (
				<TokenBalanceRow
					symbol={getNativeSymbol(chainId)}
					balance={Number(nativeBalance).toFixed(4)}
					decimals={18}
					icon={getNativeIcon(chainId)}
				/>
			)}
		</div>
	);
};

export default TokenBalances;