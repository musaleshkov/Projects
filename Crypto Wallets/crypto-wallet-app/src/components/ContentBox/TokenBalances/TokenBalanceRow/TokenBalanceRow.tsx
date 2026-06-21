import { FunctionComponent, useState } from "react";
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
	const [imgError, setImgError] = useState(false);

	const fallbackLetter = symbol ? symbol.charAt(0).toUpperCase() : "?";

	return (
		<div className="token-row">
			<div className="token-row__left"> 
				{/* Token icon */}
				<div className="token-row__icon-wrapper">
					{thumbnail && !imgError ? (
						<img
							className="token-row__icon"
							src={thumbnail}
							alt={symbol}
							onError={() => setImgError(true)}
						/>
					) : icon ? (
						<Icon className="token-row__icon-svg" icon={icon} />
					) : (
						<div className="token-row__fallback">
							{fallbackLetter}
						</div>
					)}
				</div>

				{/* Symbol + decimals */}
				<div className="token-row__info">
					<span className="token-row__symbol">{symbol}</span>
					<span className="token-row__decimals">{decimals} decimals</span>
				</div>
			</div>

			{/* Balance */}
			<div className="token-row__balance">{balance}</div>
		</div>
	);
};

export default TokenBalanceRow;