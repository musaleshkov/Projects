import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { config } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<MoralisProvider appId={config.moralisAppId} serverUrl={config.moralisServerUrl}>
			<App />
		</MoralisProvider>
	</React.StrictMode>
);
