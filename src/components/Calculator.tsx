import { useState, useCallback } from 'react';

import { CalcButton } from './CalcButton';
import { calculateExpression } from '../lib';

import './Calculator.css';

interface Data {
  expression: string,
  result: string,
}

export function Calculator() {
  const [data] = useState<Data>({
    expression: '0',
    result: '',
  });
  const [expression, setExpression] = useState(data.expression);
  const [result, setResult] = useState(data.result);

  const setData = useCallback((newData: Partial<Data>) => {
    if (newData.expression) {
      data.expression = newData.expression;
      setExpression(newData.expression);
    }

    if (newData.result) {
      data.result = newData.result;
      setResult(newData.result);
    }
  }, []);

  const setExpressionWithResult = useCallback((newExpression: string) => {
    setData({
      expression: newExpression,
      result: String(calculateExpression(newExpression)),
    });
  }, []);

  const operation = useCallback((e: React.MouseEvent) => {
    const operator = e.currentTarget.innerHTML;
    const newExpression = `${data.expression} ${operator} `;

    if (['%'].includes(operator)) {
      setExpressionWithResult(newExpression);
    } else {
      setData({ expression: newExpression });
    }
  }, []);

  const addNumber = useCallback((e: React.MouseEvent) => {
    const toAddNumber = e.currentTarget.innerHTML;

    setExpressionWithResult(`${data.expression === '0' ? '' : data.expression}${toAddNumber}`);
  }, []);

  const equals = useCallback(() => {
    setData({
      expression: String(data.result),
      result: '',
    });
  }, []);

  const alternateSignal = useCallback(() => {
    if (data.expression[0] === '-') {
      setExpressionWithResult(data.expression.slice(1));
    } else {
      setExpressionWithResult(`-${data.expression}`);
    }
  }, []);

  const clear = useCallback(() => {
    setData({
      expression: '0',
      result: '',
    });
  }, []);

  return (
    <div className="calculator">
      <div className="calc-screen">{expression}</div>
      <div className="calc-screen">{result}</div>
      <CalcButton onClick={clear}>AC</CalcButton>
      <CalcButton onClick={alternateSignal}>+/-</CalcButton>
      <CalcButton onClick={operation}>%</CalcButton>
      <CalcButton onClick={operation}>/</CalcButton>
      <CalcButton onClick={addNumber}>7</CalcButton>
      <CalcButton onClick={addNumber}>8</CalcButton>
      <CalcButton onClick={addNumber}>9</CalcButton>
      <CalcButton onClick={operation}>x</CalcButton>
      <CalcButton onClick={addNumber}>4</CalcButton>
      <CalcButton onClick={addNumber}>5</CalcButton>
      <CalcButton onClick={addNumber}>6</CalcButton>
      <CalcButton onClick={operation}>-</CalcButton>
      <CalcButton onClick={addNumber}>1</CalcButton>
      <CalcButton onClick={addNumber}>2</CalcButton>
      <CalcButton onClick={addNumber}>3</CalcButton>
      <CalcButton onClick={operation}>+</CalcButton>
      <CalcButton onClick={addNumber}>0</CalcButton>
      <CalcButton>.</CalcButton>
      <CalcButton onClick={equals}>=</CalcButton>
    </div>
  );
}
export default Calculator;
