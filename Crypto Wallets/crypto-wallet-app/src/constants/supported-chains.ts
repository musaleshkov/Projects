import { ChainInfo } from "../types";

/** Supported blockchain chains for the dropdown selector */
export const SUPPORTED_CHAINS: ChainInfo[] = [
	{ chainId: 1, chainName: "Ethereum Mainnet" },
	{ chainId: 137, chainName: "Polygon" },
	{ chainId: 56, chainName: "Binance Smart Chain Mainnet" },
	{ chainId: 97, chainName: "Binance Smart Chain Testnet" },
];

/** Chain ID to native currency symbol mapping */
export const CHAIN_NATIVE_SYMBOLS: Record<number, string> = {
	1: "ETH",
	137: "MATIC",
	56: "BNB",
	97: "BNB",
}; 

/** Chain ID to native currency icon mapping */
export const CHAIN_NATIVE_ICONS: Record<number, string> = {
	1: "logos:ethereum",
	137: "logos:polygon",
	56: "logos:binance",
	97: "logos:binance",
};