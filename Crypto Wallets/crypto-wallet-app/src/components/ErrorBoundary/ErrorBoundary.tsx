import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "2rem",
						textAlign: "center",
					}}>
					<h2>Something went wrong</h2>
					<p style={{ color: "rgb(110, 114, 125)", maxWidth: "400px" }}>
						{this.state.error?.message || "An unexpected error occurred."}
					</p>
					<button
						onClick={this.handleReset}
						style={{
							marginTop: "1rem",
							padding: "0.75em 1.5em",
							borderRadius: "0.5em",
							border: "none",
							background: "rgb(0, 122, 255)",
							color: "white",
							cursor: "pointer",
							fontWeight: 500,
						}}>
						Try Again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;