import { FunctionComponent, useEffect, useState, useCallback, createContext, useContext, ReactNode } from "react";
import { Icon } from "@iconify/react";
import "./Toast.css";

type ToastType = "success" | "error" | "info";

interface ToastItem {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastContextType {
	addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastId = 0;

export const ToastProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const addToast = useCallback((message: string, type: ToastType = "info") => {
		const id = ++toastId;
		setToasts((prev) => [...prev, { id, message, type }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3000);
	}, []);

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="toast-container">
				{toasts.map((toast, i) => (
					<div
						key={toast.id}
						className={`toast toast--${toast.type}`}
						style={{ animationDelay: `${i * 0.05}s` }}
					>
						<Icon
							className="toast__icon"
							icon={
								toast.type === "success"
									? "ph:check-circle-bold"
									: toast.type === "error"
										? "ph:x-circle-bold"
										: "ph:info-bold"
							}
						/>
						<span className="toast__message">{toast.message}</span>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = (): ToastContextType => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
};