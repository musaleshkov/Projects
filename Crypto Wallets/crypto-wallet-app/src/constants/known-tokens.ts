/** Known ERC-20 tokens per chain for balance lookups */
export interface KnownToken {
	symbol: string;
	address: string;
	decimals: number;
}

export const KNOWN_TOKENS: Record<number, KnownToken[]> = {
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