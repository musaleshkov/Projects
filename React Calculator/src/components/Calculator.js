// Dependencies
import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import CalculatorDisplay from './CalculatorDisplay';
// Constants
import { digits, operators, maxPrecision } from '../constants/commonConstants';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [firstOperand, setFirstOperand] = useState('0');
  const [clearAll, setClearAll] = useState(true);

const processDigit = newKeyValue => {
    if (waitingForOperand) {
       setDisplayValue(newKeyValue);
       setWaitingForOperand(false);
       setClearAll(false);
    } else {
      let newDisplayValue = (displayValue === '0')?`${newKeyValue}`:`${(displayValue)}${newKeyValue}`;
      setDisplayValue(newDisplayValue);
      setWaitingForOperand(false);
      setClearAll(false);
    }
}

const processOperator = newKeyValue => {
    if (firstOperand === '0' || operator == null || waitingForOperand) { 
       setFirstOperand(displayValue);
       setWaitingForOperand(true);
       setOperator(newKeyValue);
       setClearAll(false);
      return;
    } else {
      let newDisplayValue = null;
      let newOperator = null;
      let stringToEvaluate = null;
      stringToEvaluate = `${firstOperand}${operator}${displayValue}`;
      try {
        newDisplayValue = `${evaluate(stringToEvaluate)}`
      } catch (e) {
        newDisplayValue = 'Error';
      }
      if (newDisplayValue === "Infinity") newDisplayValue = 'Error'; //math.js evaluates division by 0 to be "Infinity" 
      newOperator = newKeyValue === "=" ? null : newKeyValue;
      setDisplayValue(`${newDisplayValue}`);
      setWaitingForOperand(true);
      setFirstOperand(`${newDisplayValue}`);
      setOperator(newOperator);
      setClearAll(false);
    }
}

const processPoint = newKeyValue => {
  const needPoint = `${displayValue}`.indexOf('.') ===-1 ? true : false;
  let newDisplayValue = null;

  if(waitingForOperand) { 
    setDisplayValue('0.');
    setWaitingForOperand(false);
    setClearAll(false);
  }else{
    if(needPoint) {
      newDisplayValue = `${displayValue}${newKeyValue}`;
      setDisplayValue(`${newDisplayValue}`);
      setWaitingForOperand(false);
      setClearAll(false);
    }
  }
}

const processPercentage = () => {
  const newDisplayValue = parseFloat(displayValue).toPrecision(maxPrecision) / 100;     
  setDisplayValue(`${newDisplayValue}`);
  setWaitingForOperand(false);
  setClearAll(false);
}

const processPlusMinusToggle = () => {
  const newDisplayValue = parseFloat(displayValue).toPrecision(maxPrecision) * -1
  setDisplayValue(`${newDisplayValue}`);
  setWaitingForOperand(false);
  setClearAll(false);
}

const processClear = () => {
  console.log('clearAll', clearAll);
  if (clearAll) {
    setDisplayValue('0');
    setFirstOperand('0');
    setOperator(null);
    setWaitingForOperand(false);
    setClearAll(true);
  } else {
    setDisplayValue('0');
    setClearAll(true);
  }
}

const processUnknownKey = newKeyValue => console.log('Unexpected input: ', newKeyValue);
  
const processFunctionKey = newKeyValue => {
  switch (newKeyValue) {
    case "C": processClear(newKeyValue); break;
    case "±": processPlusMinusToggle(newKeyValue); break;
    case ".": processPoint(newKeyValue); break;
    case "%": processPercentage(newKeyValue); break;
    default: processUnknownKey(newKeyValue);
  }
}

const handleClick = e => processNewKey(`${e.target.value}`);

const processNewKey = newKeyValue => {
  const isDigit = digits.includes(newKeyValue);
  const isOperator = operators.includes(newKeyValue);
  isDigit ? processDigit(newKeyValue) : isOperator ? processOperator(newKeyValue) : processFunctionKey(newKeyValue);
}
  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue}/>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button id="key-clear" value="C" className="calculator-key key-clear" onClick={handleClick}>{ clearAll ? 'AC':'C'}</button>
            <button id="key-sign" value="±" className="calculator-key key-sign" onClick={handleClick}>&plusmn;</button>
            <button id="key-percent" value="%" className="calculator-key key-percent" onClick={handleClick}>%</button>
          </div>
          <div className="digit-keys">
            <button id="key-0" value="0" className="calculator-key key-0" onClick={handleClick}>0</button>
            <button id="key-dot" value="." className="calculator-key key-dot" onClick={handleClick}>&middot;</button>
            <button id="key-1" value="1" className="calculator-key" onClick={handleClick}>1</button>
            <button id="key-2" value="2" className="calculator-key" onClick={handleClick}>2</button>
            <button id="key-3" value="3" className="calculator-key" onClick={handleClick}>3</button>
            <button id="key-4" value="4" className="calculator-key" onClick={handleClick}>4</button>
            <button id="key-5" value="5" className="calculator-key" onClick={handleClick}>5</button>
            <button id="key-6" value="6" className="calculator-key" onClick={handleClick}>6</button>
            <button id="key-7" value="7" className="calculator-key" onClick={handleClick}>7</button>
            <button id="key-8" value="8" className="calculator-key" onClick={handleClick}>8</button>
            <button id="key-9" value="9" className="calculator-key" onClick={handleClick}>9</button>
          </div>
        </div>
        <div className="operator-keys">
          <button id="key-divide" value="/" className="calculator-key key-divide" onClick={handleClick}>&divide;</button>
          <button id="key-multiply" value="*" className="calculator-key key-multiply" onClick={handleClick}>&times;</button>
          <button id="key-subtract" value="-" className="calculator-key key-subtract" onClick={handleClick}>&ndash;</button>
          <button id="key-add" value="+" className="calculator-key key-add" onClick={handleClick}>+</button>
          <button id="key-equals" value="=" className="calculator-key key-equals" onClick={handleClick}>=</button>
        </div>
      </div>
    </div>
    )
}
