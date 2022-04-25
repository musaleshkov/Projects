import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const appId: string = "BKYBIgPAiUnU93hlQFLfXHajKCMWSBMC0lIcYEsJ";
const serverUrl = "https://rnqgd19j4jys.usemoralis.com:2053/server";

root.render(
	<React.StrictMode>
		<MoralisProvider appId={appId} serverUrl={serverUrl}>
			<App />
		</MoralisProvider>
		,
	</React.StrictMode>,
);
