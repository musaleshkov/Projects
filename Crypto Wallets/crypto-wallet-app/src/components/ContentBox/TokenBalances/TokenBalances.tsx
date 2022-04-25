import { FunctionComponent, useEffect, useState } from "react";
import { useChain, useERC20Balances, useMoralis } from "react-moralis";
import { Icon } from "@iconify/react";
import "./TokenBalances.css";

const TokenBalances: FunctionComponent = () => {
	const { Moralis } = useMoralis();
	const { fetchERC20Balances, data, error } = useERC20Balances();
	const { account } = useChain();
	const [balance, SetBalance] = useState<string>("0");

	useEffect(() => {
		const timer = setTimeout(() => fetchERC20Balances(), 3000);
		return () => clearTimeout(timer);
	}, []);

	(async () =>
		SetBalance(
			await Moralis.web3Library.providers
				.getDefaultProvider()
				.getBalance(`${account}`, "latest")
				.then((res: any) => Moralis.Units?.FromWei(res)),
		))();

	return (
		<>
			{error && <>{JSON.stringify(error)}</>}
			<div className="token-balance-wrapper">
				{data?.map((token: any) => (
					<div className="token-balance-row" key={token.symbol}>
						<img src={token.thumbnail} />
						<div className="token-balance-text">{token.symbol} </div>
						<div className="token-balance-value">
							{Number(Moralis.Units?.FromWei(token.balance)).toFixed(5)}
						</div>
						<div>Decimals {token.decimals}</div>
					</div>
				))}

				<div className="token-balance-row">
					<Icon className="token-balance-icon" icon="logos:ethereum" />
					<div className="token-balance-text">Ethereum </div>
					<div className="token-balance-value">{Number(balance).toFixed(4)}</div>
					<div>Decimals 6</div>
				</div>
			</div>
		</>
	);
};

export default TokenBalances;
