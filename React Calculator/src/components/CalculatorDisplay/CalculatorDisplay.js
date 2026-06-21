// Dependencies
import React from "react";
// Constants
import { maxPrecision, maxCharsAtFullSize, scaleFactor } from "../../constants/commonConstants";
// Styles
import "./CalculatorDisplay.css";

export default function CalculatorDisplay({ value, expression, errorState }) {
	const pointAt = `${value}`.indexOf(".");
	const decimalValue = value.substring(pointAt, value.length);
	const precisionWithFraction = pointAt === -1 ? 0 : decimalValue.length - 1;
	let formattedValue;

	formattedValue = parseFloat(value).toLocaleString(undefined, {
		minimumFractionDigits: precisionWithFraction,
	});

	if (formattedValue === "NaN") {
		formattedValue = "Error";
	} else if (formattedValue.length > maxPrecision - 1) {
		let scientificNotation = parseFloat(value).toExponential(maxPrecision - 4);
		if (scientificNotation.substring(scientificNotation.length - 3) === "e+0") {
			scientificNotation = parseFloat(value).toExponential(maxPrecision - 1);
			scientificNotation = scientificNotation.substring(0, scientificNotation.length - 3);
		}
		formattedValue = scientificNotation;
		if (formattedValue === "NaN") {
			formattedValue = "Overflow Error";
		}
	}

	const scaleDown = `${formattedValue}`.length > maxCharsAtFullSize ? scaleFactor : "none";

	return (
		<div className="calculator-display">
			<div className={`display-expression ${errorState ? "display-error" : ""}`}>
				{expression || "\u00A0"}
			</div>
			<div
				className={`auto-scaling-text ${errorState ? "display-error" : ""}`}
				style={{ "--scale-factor": scaleDown }}
			>
				{formattedValue}
			</div>
		</div>
	);
}
