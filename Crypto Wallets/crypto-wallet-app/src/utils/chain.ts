import { toQuantity } from "ethers";
import { CHAIN_NATIVE_SYMBOLS, CHAIN_NATIVE_ICONS } from "../constants/supported-chains";

/** Convert a chain ID number to its hex representation for MetaMask */
export const convertToHex = (value: number): string => toQuantity(value);

/** Get the native currency symbol for a given chain ID */
export const getNativeSymbol = (chainId: number | undefined): string => {
	if (!chainId) return "ETH";
	return CHAIN_NATIVE_SYMBOLS[chainId] || "ETH";
};

/** Get the native currency icon identifier for a given chain ID */
export const getNativeIcon = (chainId: number | undefined): string => {
	if (!chainId) return "logos:ethereum";
	return CHAIN_NATIVE_ICONS[chainId] || "logos:ethereum";
};