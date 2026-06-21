import { Provider } from "react-redux";
import { type AppProps } from "next/app";
import Sentry from "@/utils/sentry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/app/store";
import { StrictMode, type ReactElement, type FC } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import "@/app/globals.css";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 2,
		},
	},
});

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps): ReactElement => {
	return (
		<StrictMode>
			<Sentry.ErrorBoundary fallback={<p>An error occurred.</p>}>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<I18nextProvider i18n={i18n}>
							<Component {...pageProps} />
						</I18nextProvider>
					</Provider>
				</QueryClientProvider>
			</Sentry.ErrorBoundary>
		</StrictMode>
	);
};

export default MyApp;