import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BrowserProvider, JsonRpcSigner, formatEther, toQuantity } from "ethers";
import { SUPPORTED_CHAINS } from "../constants/supported-chains";

export interface ChainInfo {
	chainId: number;
	chainName: string;
}

interface WalletState {
	signer: JsonRpcSigner | null; 
	account: string | null;
	chainId: number | null;
	isConnecting: boolean;
	isConnected: boolean;
}

interface WalletContextType extends WalletState {
	connect: () => Promise<void>;
	switchChain: (chainId: number) => Promise<void>;
	nativeBalance: string;
	isLoadingBalance: boolean;
	balanceError: string | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, setState] = useState<WalletState>({
		signer: null,
		account: null,
		chainId: null,
		isConnecting: false,
		isConnected: false,
	});
	const [nativeBalance, setNativeBalance] = useState("0");
	const [isLoadingBalance, setIsLoadingBalance] = useState(false);
	const [balanceError, setBalanceError] = useState<string | null>(null);
	const providerRef = useRef<BrowserProvider | null>(null);
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		return () => { mountedRef.current = false; };
	}, []);

	const refreshBalance = useCallback(async (provider: BrowserProvider, address: string) => {
		setIsLoadingBalance(true);
		setBalanceError(null);
		try {
			const balance = await provider.getBalance(address);
			if (mountedRef.current) {
				setNativeBalance(formatEther(balance));
			}
		} catch (err) {
			if (mountedRef.current) {
				setBalanceError("Failed to fetch balance");
			}
		} finally {
			if (mountedRef.current) {
				setIsLoadingBalance(false);
			}
		}
	}, []);

	const setupProvider = useCallback(async (provider: BrowserProvider) => {
		const signer = await provider.getSigner();
		const address = await signer.getAddress();
		const network = await provider.getNetwork();

		if (mountedRef.current) {
			setState({
				signer,
				account: address,
				chainId: Number(network.chainId),
				isConnecting: false,
				isConnected: true,
			});
		}

		refreshBalance(provider, address);
	}, [refreshBalance]);

	const handleAccountsChanged = useCallback(async (accounts: string[]) => {
		if (accounts.length === 0) {
			if (mountedRef.current) {
				setState({
					signer: null,
					account: null,
					chainId: null,
					isConnecting: false,
					isConnected: false,
				});
				setNativeBalance("0");
			}
		} else if (providerRef.current) {
			setupProvider(providerRef.current);
		}
	}, [setupProvider]);

	const handleChainChanged = useCallback(async (_chainId: string) => {
		// Create a fresh provider — the old one is stale after chain change
		if (!window.ethereum) return;
		const newProvider = new BrowserProvider(window.ethereum);
		providerRef.current = newProvider;
		await setupProvider(newProvider);
	}, [setupProvider]);

	useEffect(() => {
		if (!window.ethereum) return;

		const eth = window.ethereum;
		eth.on("accountsChanged", handleAccountsChanged as unknown as (...args: unknown[]) => void);
		eth.on("chainChanged", handleChainChanged as unknown as (...args: unknown[]) => void);

		return () => {
			eth.removeListener("accountsChanged", handleAccountsChanged as unknown as (...args: unknown[]) => void);
			eth.removeListener("chainChanged", handleChainChanged as unknown as (...args: unknown[]) => void);
		};
	}, [handleAccountsChanged, handleChainChanged]);

	const connect = useCallback(async () => {
		if (!window.ethereum) {
			window.open("https://metamask.io/", "_blank");
			return;
		}

		setState((prev) => ({ ...prev, isConnecting: true }));

		try {
			const provider = new BrowserProvider(window.ethereum);
			providerRef.current = provider;
			await provider.send("eth_requestAccounts", []);
			await setupProvider(provider);
		} catch (err) {
			if (mountedRef.current) {
				setState((prev) => ({ ...prev, isConnecting: false }));
			}
			throw err;
		}
	}, [setupProvider]);

	const switchChain = useCallback(async (chainId: number) => {
		if (!window.ethereum) return;

		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: toQuantity(chainId) }],
			});
		} catch (switchError: unknown) {
			// Chain not added — try to add it
			const chain = SUPPORTED_CHAINS.find((c) => c.chainId === chainId);
			if (!chain) return;

			if ((switchError as { code?: number }).code === 4902) {
				try {
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: toQuantity(chainId),
								chainName: chain.chainName,
								rpcUrls: [`https://chainid.network/${chain.chainName.toLowerCase().replace(/\s+/g, "-")}.rpc`],
							},
						],
					});
				} catch {
					// User rejected or RPC failed
				}
			}
		}
	}, []);

	return (
		<WalletContext.Provider
			value={{
				...state,
				connect,
				switchChain,
				nativeBalance,
				isLoadingBalance,
				balanceError,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
};

export const useWallet = (): WalletContextType => {
	const ctx = useContext(WalletContext);
	if (!ctx) throw new Error("useWallet must be used within WalletProvider");
	return ctx;
};