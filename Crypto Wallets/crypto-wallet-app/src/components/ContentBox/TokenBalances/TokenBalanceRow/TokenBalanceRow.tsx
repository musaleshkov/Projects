import { FunctionComponent } from "react";
import { Icon } from "@iconify/react";

interface TokenBalanceRowProps {
	symbol: string;
	balance: string;
	decimals: number;
	thumbnail?: string;
	icon?: string;
}

const TokenBalanceRow: FunctionComponent<TokenBalanceRowProps> = ({
	symbol,
	balance,
	decimals,
	thumbnail,
	icon,
}) => {
	return (
		<div className="token-balance-row">
			{thumbnail ? (
				<img
					className="token-balance-icon"
					src={thumbnail}
					alt={symbol}
					onError={(e) => {
						(e.target as HTMLImageElement).style.display = "none";
					}}
				/>
			) : icon ? (
				<Icon className="token-balance-icon" icon={icon} />
			) : null}
			<div className="token-balance-text">{symbol}</div>
			<div className="token-balance-value">{balance}</div>
			<div className="token-balance-decimals">{decimals} decimals</div>
		</div>
	);
};

export default TokenBalanceRow;