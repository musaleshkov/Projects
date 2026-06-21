import { FunctionComponent, useEffect, useRef } from "react";
import { useChain, useERC20Balances, useMoralis } from "react-moralis";
import { useNativeBalance } from "../../../hooks/useNativeBalance";
import { TokenBalanceItem } from "../../../types";
import { getNativeSymbol, getNativeIcon } from "../../../utils/chain";
import TokenBalanceRow from "./TokenBalanceRow/TokenBalanceRow";
import "./TokenBalances.css";

interface ERC20TokenRaw {
	symbol?: string;
	token_address: string;
	balance: string;
	decimals: number;
	thumbnail?: string;
}

const TokenBalances: FunctionComponent = () => {
	const { Moralis } = useMoralis();
	const { fetchERC20Balances, data, isLoading: erc20Loading, error: erc20Error } = useERC20Balances();
	const { chain } = useChain();
	const { balance: nativeBalance, isLoading: nativeLoading, error: nativeError } = useNativeBalance();
	const hasFetched = useRef(false);

	useEffect(() => {
		if (Moralis && !hasFetched.current) {
			hasFetched.current = true;
			fetchERC20Balances();
		}
	}, [Moralis, fetchERC20Balances]);

	const isLoading = erc20Loading || nativeLoading;
	const hasError = erc20Error || nativeError;
	const hasNoBalances = !data?.length && Number(nativeBalance) === 0;

	if (isLoading) {
		return (
			<div className="token-balance-wrapper">
				<div className="token-balance-state">Loading balances...</div>
			</div>
		);
	}

	if (hasError) {
		const message = nativeError?.message || (erc20Error ? String(erc20Error) : "Unknown error");
		return (
			<div className="token-balance-wrapper">
				<div className="token-balance-state token-balance-error">
					Error loading balances: {message}
				</div>
			</div>
		);
	}

	if (hasNoBalances) {
		return (
			<div className="token-balance-wrapper">
				<div className="token-balance-state">No token balances found.</div>
			</div>
		);
	}

	const tokens: TokenBalanceItem[] = (data as ERC20TokenRaw[])?.map((token) => ({
		symbol: token.symbol || "Unknown",
		balance: Number(Moralis.Units?.FromWei(token.balance)).toFixed(5),
		decimals: token.decimals,
		thumbnail: token.thumbnail,
		tokenAddress: token.token_address,
	})) || [];

	const chainId = chain?.chainId ? Number(chain.chainId) : undefined;

	return (
		<div className="token-balance-wrapper">
			{tokens.map((token) => (
				<TokenBalanceRow
					key={token.tokenAddress || token.symbol}
					symbol={token.symbol}
					balance={token.balance}
					decimals={token.decimals}
					thumbnail={token.thumbnail}
				/>
			))}

			<TokenBalanceRow
				symbol={getNativeSymbol(chainId)}
				balance={Number(nativeBalance).toFixed(4)}
				decimals={18}
				icon={getNativeIcon(chainId)}
			/>
		</div>
	);
};

export default TokenBalances;
