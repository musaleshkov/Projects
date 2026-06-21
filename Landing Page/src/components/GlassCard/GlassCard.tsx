import { type FunctionComponent, type ReactElement, type HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
	hover?: boolean;
}

const GlassCard: FunctionComponent<GlassCardProps> = ({
	className = "",
	hover = true,
	children,
	...props
}: GlassCardProps): ReactElement => {
	return (
		<div
			className={`bg-white/10 backdrop-blur-md rounded-4xl shadow-glass border border-white/20 p-6 ${
				hover ? "transition-transform duration-300 hover:scale-[1.02] hover:shadow-glass-lg" : ""
			} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default GlassCard;