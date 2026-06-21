import { Html, Head, Main, NextScript } from "next/document";
import { type ReactElement } from "react";

export default function Document(): ReactElement {
	return (
		<Html lang="en" suppressHydrationWarning>
			<Head>
				<meta charSet="utf-8" />
				<meta name="description" content="Health assessment landing page — find out if our health services are right for you." />
				<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
				<meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className="bg-background text-foreground font-sans antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}