// cypress/support/TestWrapper.tsx
import React, { ReactElement, StrictMode } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { store } from "@/app/store"; // Import your Redux store
import i18n from "@/utils/i18n"; // Import your i18n instance
import theme from "@/styles/theme";
import Sentry from "@/utils/sentry";
import { QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "@/styles/GlobalStyles";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { queryClient } from "@/pages/_app"; // Import your theme

interface TestWrapperProps {
	children: ReactElement;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
	return (
		<StrictMode>
			<Sentry.ErrorBoundary fallback={<p>An error occurred.</p>}>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<ThemeProvider theme={theme}>
							<I18nextProvider i18n={i18n}>
								<GlobalStyles/>
								<LanguageSwitcher/>
								{children}
							</I18nextProvider>
						</ThemeProvider>
					</Provider>
				</QueryClientProvider>
			</Sentry.ErrorBoundary>
		</StrictMode>
	);
};

export default TestWrapper;
