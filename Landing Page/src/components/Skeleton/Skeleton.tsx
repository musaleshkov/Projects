import { type FunctionComponent } from "react";

interface SkeletonProps {
	className?: string;
	variant?: "text" | "circular" | "rectangular";
	width?: string | number;
	height?: string | number;
}

const Skeleton: FunctionComponent<SkeletonProps> = ({
	className = "",
	variant = "text",
	width,
	height,
}) => {
	const baseClasses = "animate-shimmer bg-gradient-to-r from-secondary-200 via-secondary-100 to-secondary-200 bg-[length:200%_100%]";

	const variantClasses = {
		text: "h-4 rounded",
		circular: "rounded-full",
		rectangular: "rounded-lg",
	};

	const style: React.CSSProperties = {} as React.CSSProperties;
	if (width) style.width = typeof width === "number" ? `${width}px` : width;
	if (height) style.height = typeof height === "number" ? `${height}px` : height;

	return (
		<div
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			style={style}
			aria-hidden="true"
			role="presentation"
		/>
	);
};

export default Skeleton;