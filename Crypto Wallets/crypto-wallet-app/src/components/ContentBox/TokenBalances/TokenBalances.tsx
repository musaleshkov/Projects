import { FunctionComponent, useCallback, useEffect, useRef, useState, memo } from "react";
import { Contract, formatUnits } from "ethers";
import { Icon } from "@iconify/react";
import { useWallet } from "../../../contexts/WalletContext";
import { TokenBalanceItem } from "../../../types";
import { erc20ABI } from "../../../abi/erc20-abi";
import { KNOWN_TOKENS } from "../../../constants/known-tokens";
import { getNativeSymbol, getNativeIcon } from "../../../utils/chain";
import TokenBalanceRow from "./TokenBalanceRow/TokenBalanceRow";
import "./TokenBalances.css";

const SKELETON_COUNT = 4;
const LOADING_TIMEOUT_MS = 25000;

const TokenBalances: FunctionComponent = memo(() => {
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

		// Parallelize all token balance fetches
		const balancePromises = chainTokens.map(async (token) => {
			try {
				const contract = new Contract(token.address, erc20ABI, signer);
				const balance = await contract.balanceOf(account);
				const formatted = formatUnits(balance, token.decimals);
				if (Number(formatted) > 0) {
					return {
						symbol: token.symbol,
						balance: Number(formatted).toFixed(4),
						decimals: token.decimals,
						tokenAddress: token.address,
					} as TokenBalanceItem;
				}
			} catch {
				// Skip individual token failures
			}
			return null;
		});

		const settled = await Promise.allSettled(balancePromises);
		const results = settled
			.filter((r) => r.status === "fulfilled" && r.value !== null)
			.map((r) => (r as PromiseFulfilledResult<TokenBalanceItem | null>).value!)
			.filter(Boolean);

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
		const timer = setTimeout(() => { if (isLoading) setTimedOut(true); }, LOADING_TIMEOUT_MS);
		return () => clearTimeout(timer);
	}, [isLoading]);

	const showLoading = !timedOut && (isLoading || isLoadingBalance);
	const hasTokenError = error || (timedOut ? "Loading timed out" : null);

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

	if (hasTokenError || balanceError) {
		const message = hasTokenError || balanceError || "Unknown error";
		return (
			<div className="token-balance-wrapper">
				<div className="token-balance-state token-balance-error">
					<Icon className="token-balance-error-icon" icon="ph:warning-circle-bold" />
					<div>Failed to load balances</div>
					<div className="token-balance-error-detail">{message}</div>
				</div>
			</div>
		);
	}

	if (tokens.length === 0 && Number(nativeBalance) === 0) {
		return (
			<div className="token-balance-empty">
				<Icon className="token-balance-empty__icon" icon="ph:wallet-bold" />
				<span className="token-balance-empty__text">No tokens found</span>
				<span className="token-balance-empty__subtext">Your wallet has no tokens on this chain</span>
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
});

export default TokenBalances;