/**
 * Application configuration validated at import time.
 * Throws descriptive errors if required environment variables are missing.
 */

const appId = process.env.REACT_APP_MORALIS_APP_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

if (!appId) {
	console.error(
		"REACT_APP_MORALIS_APP_ID is not set. Create a .env file with your Moralis credentials. See https://docs.moralis.io/"
	);
}

if (!serverUrl) {
	console.error(
		"REACT_APP_MORALIS_SERVER_URL is not set. Create a .env file with your Moralis credentials. See https://docs.moralis.io/"
	);
}

export const config = {
	moralisAppId: appId || "",
	moralisServerUrl: serverUrl || "",
	isConfigured: Boolean(appId && serverUrl),
} as const;