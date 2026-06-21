import { type ButtonHTMLAttributes, type ReactElement } from "react";

export const PrimaryButton = ({
	className = "",
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
	return (
		<button
			className={`cursor-pointer inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-primary-700 hover:shadow-glass focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export const QuizButton = ({
	className = "",
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
	return (
		<button
			className={`cursor-pointer w-full text-left px-6 py-5 rounded-2xl border-2 border-secondary-200 bg-white text-foreground font-medium text-base transition-all duration-300 hover:border-primary-400 hover:shadow-card hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export const Container = ({
	className = "",
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>): ReactElement => {
	return (
		<div
			className={`flex flex-col items-center justify-center text-center overflow-hidden w-full ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};