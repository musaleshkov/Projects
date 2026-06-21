import { type ButtonHTMLAttributes, type FunctionComponent, type ReactElement } from "react";

export const PrimaryButton: FunctionComponent<
	ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = "", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
	return (
		<button
			className={`bg-primary-600 text-white px-8 py-4 rounded-lg uppercase tracking-wider font-bold hover:bg-primary-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
			className={`px-8 py-4 border-none rounded-md cursor-pointer text-base transition-all duration-300 mx-4 my-4 hover:brightness-90 hover:contrast-110 hover:blur-[0.3px] bg-secondary-100 text-foreground font-semibold ${className}`}
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
			className={`flex flex-col items-center justify-center text-center overflow-hidden ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};