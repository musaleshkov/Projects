/** Format a price with appropriate decimal places */
export const formatPrice = (price: number): string => {
	if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
	if (price >= 1) return `$${price.toFixed(2)}`;
	return `$${price.toFixed(4)}`;
};

/** Format large numbers like market cap to human-readable strings */
export const formatLargeNumber = (num: number): string => {
	if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
	if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
	if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
	if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
	return `$${num.toFixed(2)}`;
};