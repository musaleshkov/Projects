/** Represents a blockchain chain configuration */
export interface ChainInfo {
	chainId: number;
	chainName: string;
}

/** Represents a single token balance entry */
export interface TokenBalanceItem {
	symbol: string;
	balance: string;
	decimals: number;
	thumbnail?: string;
	icon?: string;
	tokenAddress?: string;
}

/** Represents the balances state for the entire wallet */
export interface BalancesState {
	nativeBalance: string;
	tokens: TokenBalanceItem[];
	isLoading: boolean;
	error: Error | null;
}

/** Typed window.ethereum provider interface */
export interface EthereumProvider {
	isMetaMask?: boolean;
	request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
	on?: (event: string, callback: (...args: unknown[]) => void) => void;
	removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
}