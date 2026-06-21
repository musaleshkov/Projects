// Dependencies
import { useState, useCallback } from "react";
import { evaluate, format } from "mathjs";
// Constants
import { digits, operators, scientificOperators, maxPrecision } from "../constants/commonConstants";

// History entry shape: { expression, result }
const MAX_HISTORY = 20;

export default function useCalculator() {
	const [displayValue, setDisplayValue] = useState("0");
	const [expression, setExpression] = useState("");
	const [operator, setOperator] = useState(null);
	const [waitingForOperand, setWaitingForOperand] = useState(false);
	const [firstOperand, setFirstOperand] = useState(null);
	const [clearAll, setClearAll] = useState(true);
	const [history, setHistory] = useState([]);
	const [showHistory, setShowHistory] = useState(false);
	const [errorState, setErrorState] = useState(false);

	const resetError = useCallback(() => {
		if (errorState) {
			setErrorState(false);
			setDisplayValue("0");
			setExpression("");
			setFirstOperand(null);
			setOperator(null);
			setWaitingForOperand(false);
			setClearAll(true);
		}
	}, [errorState]);

	const processDigit = useCallback(
		(newKeyValue) => {
			if (errorState) resetError();
			if (waitingForOperand) {
				setDisplayValue(newKeyValue);
				setExpression((prev) => prev + newKeyValue);
				setWaitingForOperand(false);
				setClearAll(false);
			} else {
				const newDisplayValue =
					displayValue === "0" ? newKeyValue : displayValue + newKeyValue;
				setDisplayValue(newDisplayValue);
				setExpression((prev) =>
					prev === "" || displayValue === "0" ? newKeyValue : prev + newKeyValue,
				);
				setClearAll(false);
			}
		},
		[displayValue, waitingForOperand, errorState, resetError],
	);

	const safeEvaluate = useCallback((expr) => {
		try {
			const result = evaluate(expr);
			if (!isFinite(result)) return { value: "Error", error: true };
			const formatted = format(result, { precision: maxPrecision });
			return { value: formatted, error: false };
		} catch (_e) {
			return { value: "Error", error: true };
		}
	}, []);

	const processOperator = useCallback(
		(newKeyValue) => {
			if (errorState) return;
			const inputValue = displayValue;

			if (newKeyValue === "=") {
				if (firstOperand !== null && operator) {
					const expr = `${firstOperand} ${operator} ${displayValue}`;
					const { value, error } = safeEvaluate(expr);
					if (error) {
						setErrorState(true);
						setDisplayValue(value);
						setExpression(expr + " =");
						return;
					}
					setHistory((prev) =>
						[{ expression: expr, result: value }, ...prev].slice(0, MAX_HISTORY),
					);
					setDisplayValue(value);
					setExpression((prev) => prev + " = " + value);
					setFirstOperand(null);
					setOperator(null);
					setWaitingForOperand(false);
					setClearAll(false);
				}
				return;
			}

			if (operator && !waitingForOperand) {
				const expr = `${firstOperand} ${operator} ${inputValue}`;
				const { value, error } = safeEvaluate(expr);
				if (error) {
					setErrorState(true);
					setDisplayValue(value);
					return;
				}
				setDisplayValue(value);
				setExpression(`${value} ${newKeyValue} `);
				setFirstOperand(value);
				setOperator(newKeyValue);
				setWaitingForOperand(true);
				setClearAll(false);
			} else {
				const numericValue = inputValue;
				setFirstOperand(numericValue);
				setOperator(newKeyValue);
				setWaitingForOperand(true);
				setExpression(`${numericValue} ${newKeyValue} `);
				setClearAll(false);
			}
		},
		[displayValue, operator, waitingForOperand, firstOperand, errorState, safeEvaluate],
	);

	const processPoint = useCallback(
		(newKeyValue) => {
			if (errorState) resetError();
			if (displayValue.includes(".") && !waitingForOperand) return;

			if (waitingForOperand) {
				setDisplayValue("0.");
				setExpression((prev) => prev + "0.");
				setWaitingForOperand(false);
				setClearAll(false);
			} else {
				const newDisplayValue = displayValue + newKeyValue;
				setDisplayValue(newDisplayValue);
				setExpression((prev) => (prev === "" ? "0." : prev + newKeyValue));
				setClearAll(false);
			}
		},
		[displayValue, waitingForOperand, errorState, resetError],
	);

	const processPercentage = useCallback(() => {
		if (errorState) return;
		try {
			const num = parseFloat(displayValue);
			if (isNaN(num)) return;
			const result = num / 100;
			const formatted = format(result, { precision: maxPrecision });
			setDisplayValue(formatted);
			setExpression((prev) => prev.replace(displayValue, formatted));
			setClearAll(false);
		} catch (_e) {
			setErrorState(true);
			setDisplayValue("Error");
		}
	}, [displayValue, errorState]);

	const processPlusMinusToggle = useCallback(() => {
		if (errorState) return;
		if (displayValue === "0") return;
		const toggled = displayValue.startsWith("-") ? displayValue.slice(1) : "-" + displayValue;
		setDisplayValue(toggled);
		setExpression((prev) =>
			prev.replace(
				new RegExp(displayValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"),
				toggled,
			),
		);
		setClearAll(false);
	}, [displayValue, errorState]);

	const processBackspace = useCallback(() => {
		if (errorState) {
			resetError();
			return;
		}
		if (waitingForOperand) return;
		if (
			displayValue.length === 1 ||
			(displayValue.length === 2 && displayValue.startsWith("-"))
		) {
			setDisplayValue("0");
			setExpression((prev) => prev.slice(0, -1));
			setClearAll(true);
		} else {
			setDisplayValue(displayValue.slice(0, -1));
			setExpression((prev) => prev.slice(0, -1));
		}
	}, [displayValue, waitingForOperand, errorState, resetError]);

	const processSquareRoot = useCallback(() => {
		if (errorState) return;
		try {
			const num = parseFloat(displayValue);
			if (isNaN(num) || num < 0) {
				setErrorState(true);
				setDisplayValue("Error");
				return;
			}
			const result = format(Math.sqrt(num), { precision: maxPrecision });
			setDisplayValue(result);
			setExpression(`√(${displayValue}) = ${result}`);
			setHistory((prev) =>
				[{ expression: `√(${displayValue})`, result }, ...prev].slice(0, MAX_HISTORY),
			);
			setClearAll(false);
		} catch (_e) {
			setErrorState(true);
			setDisplayValue("Error");
		}
	}, [displayValue, errorState]);

	const processSquare = useCallback(() => {
		if (errorState) return;
		try {
			const num = parseFloat(displayValue);
			if (isNaN(num)) return;
			const result = format(num * num, { precision: maxPrecision });
			setDisplayValue(result);
			setExpression(`(${displayValue})² = ${result}`);
			setHistory((prev) =>
				[{ expression: `(${displayValue})²`, result }, ...prev].slice(0, MAX_HISTORY),
			);
			setClearAll(false);
		} catch (_e) {
			setErrorState(true);
			setDisplayValue("Error");
		}
	}, [displayValue, errorState]);

	const processClear = useCallback(() => {
		if (clearAll) {
			setDisplayValue("0");
			setExpression("");
			setFirstOperand(null);
			setOperator(null);
			setWaitingForOperand(false);
			setClearAll(true);
			setErrorState(false);
		} else {
			setDisplayValue("0");
			setClearAll(true);
			setErrorState(false);
		}
	}, [clearAll]);

	const processClearHistory = useCallback(() => {
		setHistory([]);
		setShowHistory(false);
	}, []);

	const toggleHistory = useCallback(() => {
		setShowHistory((prev) => !prev);
	}, []);

	const processHistorySelect = useCallback((entry) => {
		setDisplayValue(entry.result);
		setExpression(entry.expression + " = " + entry.result);
		setFirstOperand(null);
		setOperator(null);
		setWaitingForOperand(false);
		setClearAll(false);
		setErrorState(false);
		setShowHistory(false);
	}, []);

	const processFunctionKey = useCallback(
		(newKeyValue) => {
			switch (newKeyValue) {
				case "C":
					processClear();
					break;
				case "⌫":
					processBackspace();
					break;
				case "±":
					processPlusMinusToggle();
					break;
				case ".":
					processPoint(newKeyValue);
					break;
				case "%":
					processPercentage();
					break;
				case "√":
					processSquareRoot();
					break;
				case "x²":
					processSquare();
					break;
				default:
					console.warn("Unexpected input:", newKeyValue);
			}
		},
		[
			processClear,
			processBackspace,
			processPlusMinusToggle,
			processPoint,
			processPercentage,
			processSquareRoot,
			processSquare,
		],
	);

	const processNewKey = useCallback(
		(newKeyValue) => {
			const isDigit = digits.includes(newKeyValue);
			const isOperator = operators.includes(newKeyValue);
			const isScientific = scientificOperators.includes(newKeyValue);

			if (isDigit) {
				processDigit(newKeyValue);
			} else if (isOperator) {
				processOperator(newKeyValue);
			} else if (isScientific) {
				processFunctionKey(newKeyValue);
			} else {
				processFunctionKey(newKeyValue);
			}
		},
		[processDigit, processOperator, processFunctionKey],
	);

	return {
		displayValue,
		expression,
		clearAll,
		history,
		showHistory,
		errorState,
		toggleHistory,
		processHistorySelect,
		processClearHistory,
		processNewKey,
	};
}
