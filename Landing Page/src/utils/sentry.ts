import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/react";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? "",
	integrations: [browserTracingIntegration()],
	tracesSampleRate: 1.0,
});

export default Sentry;
