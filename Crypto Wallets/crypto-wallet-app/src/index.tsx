import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WalletProvider } from "./contexts/WalletContext";
import { ToastProvider } from "./components/Toast/Toast";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<WalletProvider>
			<ToastProvider>
				<App />
			</ToastProvider>
		</WalletProvider>
	</React.StrictMode>
);