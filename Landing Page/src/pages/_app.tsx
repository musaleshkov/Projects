import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { Provider } from "react-redux";
import GlobalStyles from "../styles/GlobalStyles";
import { AppProps } from "next/app";
import Sentry from "@/utils/sentry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/app/store";
import React, { ReactElement, StrictMode, FunctionComponent } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 2,
		},
	},
});

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): ReactElement => {
	return (
		<StrictMode>
			<Sentry.ErrorBoundary fallback={<p>An error occurred.</p>}>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<ThemeProvider theme={theme}>
							<I18nextProvider i18n={i18n}>
								<GlobalStyles/>
								<Component {...pageProps} />
							</I18nextProvider>
						</ThemeProvider>
					</Provider>
				</QueryClientProvider>
			</Sentry.ErrorBoundary>
		</StrictMode>
	);
};

export default MyApp;
