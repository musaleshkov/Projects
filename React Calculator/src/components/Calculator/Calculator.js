// Dependencies
import React, { useEffect, useCallback } from "react";
// Hooks
import useCalculator from "../../hooks/useCalculator";
// Components
import CalculatorDisplay from "../CalculatorDisplay/CalculatorDisplay";
// Styles
import "./Calculator.css";

export default function Calculator() {
	const {
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
	} = useCalculator();

	const handleClick = useCallback((e) => processNewKey(`${e.target.value}`), [processNewKey]);

	// Keyboard support
	useEffect(() => {
		const handleKeyDown = (e) => {
			const key = e.key;
			// Prevent default for calculator keys
			if (
				/[0-9]/.test(key) ||
				["+", "-", "*", "/", ".", "=", "Enter", "Escape", "Backspace", "%"].includes(key) ||
				key === "Delete"
			) {
				e.preventDefault();
			}

			if (/[0-9]/.test(key)) {
				processNewKey(key);
			} else if (key === "+") {
				processNewKey("+");
			} else if (key === "-") {
				processNewKey("-");
			} else if (key === "*") {
				processNewKey("*");
			} else if (key === "/") {
				processNewKey("/");
			} else if (key === ".") {
				processNewKey(".");
			} else if (key === "=" || key === "Enter") {
				processNewKey("=");
			} else if (key === "Escape" || key === "Delete") {
				processNewKey("C");
			} else if (key === "Backspace") {
				processNewKey("⌫");
			} else if (key === "%") {
				processNewKey("%");
			} else if (key === "h" || key === "H") {
				toggleHistory();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [processNewKey, toggleHistory]);

	return (
		<div className="calculator">
			<CalculatorDisplay
				value={displayValue}
				expression={expression}
				errorState={errorState}
			/>

			{/* History Panel */}
			{showHistory && (
				<div className="history-panel">
					<div className="history-header">
						<span className="history-title">History</span>
						<button
							className="history-clear-btn"
							onClick={processClearHistory}
							aria-label="Clear history"
						>
							Clear
						</button>
					</div>
					<div className="history-list">
						{history.length === 0 ? (
							<div className="history-empty">No history yet</div>
						) : (
							history.map((entry, idx) => (
								<button
									key={idx}
									className="history-item"
									onClick={() => processHistorySelect(entry)}
									aria-label={`Use result ${entry.result}`}
								>
									<span className="history-expr">{entry.expression}</span>
									<span className="history-result">{entry.result}</span>
								</button>
							))
						)}
					</div>
				</div>
			)}

			<div className="calculator-keypad">
				<div className="input-keys">
					<div className="function-keys">
						<button
							id="key-sqrt"
							value="√"
							className="calculator-key key-scientific"
							onClick={handleClick}
							aria-label="square root"
						>
							√
						</button>
						<button
							id="key-square"
							value="x²"
							className="calculator-key key-scientific"
							onClick={handleClick}
							aria-label="x squared"
						>
							x²
						</button>
						<button
							id="key-clear"
							value="C"
							className="calculator-key key-clear"
							onClick={handleClick}
							aria-label={clearAll ? "All clear" : "Clear"}
						>
							{clearAll ? "AC" : "C"}
						</button>
						<button
							id="key-backspace"
							value="⌫"
							className="calculator-key key-clear"
							onClick={handleClick}
							aria-label="backspace"
						>
							⌫
						</button>
					</div>
					<div className="digit-keys">
						<button
							id="key-0"
							value="0"
							className="calculator-key key-0"
							onClick={handleClick}
						>
							0
						</button>
						<button
							id="key-dot"
							value="."
							className="calculator-key key-dot"
							onClick={handleClick}
						>
							.
						</button>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
							<button
								key={num}
								id={`key-${num}`}
								value={String(num)}
								className="calculator-key"
								onClick={handleClick}
							>
								{num}
							</button>
						))}
					</div>
					<div className="bottom-keys">
						<button
							id="key-sign"
							value="±"
							className="calculator-key key-scientific"
							onClick={handleClick}
							aria-label="plus minus toggle"
						>
							±
						</button>
						<button
							id="key-percent"
							value="%"
							className="calculator-key key-scientific"
							onClick={handleClick}
							aria-label="percent"
						>
							%
						</button>
						<button
							id="key-history"
							className="calculator-key key-scientific key-history"
							onClick={toggleHistory}
							aria-label="toggle history"
						>
							{showHistory ? "✕" : "⏱"}
						</button>
					</div>
				</div>
				<div className="operator-keys">
					<button
						id="key-divide"
						value="/"
						className="calculator-key key-divide"
						onClick={handleClick}
						aria-label="divide"
					>
						÷
					</button>
					<button
						id="key-multiply"
						value="*"
						className="calculator-key key-multiply"
						onClick={handleClick}
						aria-label="multiply"
					>
						×
					</button>
					<button
						id="key-subtract"
						value="-"
						className="calculator-key key-subtract"
						onClick={handleClick}
						aria-label="subtract"
					>
						−
					</button>
					<button
						id="key-add"
						value="+"
						className="calculator-key key-add"
						onClick={handleClick}
						aria-label="add"
					>
						+
					</button>
					<button
						id="key-equals"
						value="="
						className="calculator-key key-equals"
						onClick={handleClick}
						aria-label="equals"
					>
						=
					</button>
				</div>
			</div>
		</div>
	);
}
