import type { Method } from './types';

export function arithmeticOperation(method: 'percentage', leftOperand: number): number;
export function arithmeticOperation(
  method: Exclude<Method, 'percentage'>,
  leftOperand: number,
  rightOperand: number,
): number;
export function arithmeticOperation(
  method: Method,
  leftOperand: number,
  rightOperand?: number,
): number;
export function arithmeticOperation(method: Method, leftOperand: number, rightOperand = 0) {
  const possibleOperations: Record<Method, () => number> = {
    add: () => leftOperand + rightOperand,
    subtract: () => leftOperand - rightOperand,
    divide: () => leftOperand / rightOperand,
    multiply: () => leftOperand * rightOperand,
    percentage: () => leftOperand / 100,
  };

  return possibleOperations[method]();
}
export default arithmeticOperation;
