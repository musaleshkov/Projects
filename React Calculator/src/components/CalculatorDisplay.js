// Dependencies
import React from 'react'
import { evaluate } from 'mathjs';
// Constants
import { maxPrecision, maxCharsAtFullSize, scaleFactor } from '../constants/commonConstants';

export default function CalculatorDisplay({value}) {
    const pointAt = `${value}`.indexOf('.');
    const decimalValue = value.substring(pointAt, evaluate(value.length));
    const precisionWithFraction = pointAt === -1 ? 0 : evaluate(decimalValue.length - 1);
    let formattedValue = null;
    let scientificNotation = null;
    let scaleDown = null;
  
    formattedValue = parseFloat(value).toLocaleString(undefined, {minimumFractionDigits: precisionWithFraction});
    if (formattedValue === 'NaN') {
      formattedValue = 'Error';
    } else {
      if (formattedValue.length > (maxPrecision - 1)) {
        scientificNotation = parseFloat(value).toExponential(maxPrecision - 4);
        if (scientificNotation.substring(scientificNotation.length - 3, scientificNotation.length) === 'e+0') {
          scientificNotation = parseFloat(value).toExponential(maxPrecision - 1 );
          scientificNotation = scientificNotation.substring(0, scientificNotation.length - 3)
        }
        formattedValue = scientificNotation;
        if (formattedValue === 'NaN') formattedValue = 'Overflow\xA0Error'; //account for overflow
      }
    }
  scaleDown = (`${formattedValue}`.length) > maxCharsAtFullSize ? scaleFactor : 'scale(1)';
  return (
      <div className="calculator-display">
        <div className="auto-scaling-text" style={{transform: scaleDown}}>
          {formattedValue}
        </div>
      </div>
  );
}