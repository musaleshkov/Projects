import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms"; // Import the forms plugin
import typography from "@tailwindcss/typography"; // Import the typography plugin

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "var(--primary)", // Added primary color
				secondary: "var(--secondary)", // Added secondary color
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"], // Added custom font family
			},
		},
	},
	plugins: [
		forms, // Use the imported forms plugin
		typography, // Use the imported typography plugin
	],
} satisfies Config;
