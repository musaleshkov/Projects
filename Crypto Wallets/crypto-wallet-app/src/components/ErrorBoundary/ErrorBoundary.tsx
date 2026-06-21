import { Component, ErrorInfo, ReactNode } from "react";
import { Icon } from "@iconify/react";
import "./ErrorBoundary.css";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("ErrorBoundary caught:", error, errorInfo);
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<div className="error-boundary__card">
						<div className="error-boundary__border" />

						<div className="error-boundary__content">
							<Icon
								className="error-boundary__icon"
								icon="ph:warning-octagon-bold"
							/>

							<h2 className="error-boundary__title">Something went wrong</h2>
							<p className="error-boundary__message">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>

							<button
								className="error-boundary__retry-btn"
								onClick={this.handleRetry}
								type="button"
							>
								<Icon icon="ph:arrow-counter-clockwise-bold" />
								<span>Try Again</span>
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;