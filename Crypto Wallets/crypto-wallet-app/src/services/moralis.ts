/**
 * Centralized Moralis API service layer.
 * All Moralis SDK calls should be routed through functions defined here
 * to keep components lean and testable.
 *
 * Compatible with react-moralis v1.x
 */

import type MoralisModule from "moralis";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MoralistInstance = typeof MoralisModule & { Units?: any };

export interface ERC20TokenRaw {
    symbol?: string;
    token_address: string;
    balance: string;
    decimals: number;
    thumbnail?: string;
}

export interface NativeBalanceResult {
    balance: string;
    formatted: string;
}

/**
 * Fetch ERC-20 token balances for the connected wallet on the current chain
 * using react-moralis's useERC20Balances hook data.
 */
export function formatTokenBalances(
    data: ERC20TokenRaw[] | undefined,
    Moralis: MoralistInstance,
): ERC20TokenRaw[] {
    if (!data?.length) {
        return [];
    }
    return data.map((token) => ({
        ...token,
        symbol: token.symbol || "Unknown",
    }));
}

/**
 * Format a raw ERC-20 token balance using Moralis Units helper.
 */
export function formatERC20Balance(rawBalance: string, decimals: number, Moralis: MoralistInstance): string {
    try {
        return Number(Moralis.Units?.FromWei(rawBalance, decimals)).toFixed(5);
    } catch {
        return "0";
    }
}

/**
 * Format a native balance using Moralis Units helper.
 */
export function formatNativeBalance(rawBalance: string, Moralis: MoralistInstance): string {
    try {
        return Number(Moralis.Units?.FromWei(rawBalance)).toFixed(4);
    } catch {
        return "0";
    }
}