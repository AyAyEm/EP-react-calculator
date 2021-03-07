import type { Operator, Method } from './types';

export const operations = new Map<Operator, Method>([
  ['-', 'subtract'],
  ['+', 'add'],
  ['/', 'divide'],
  ['x', 'multiply'],
  ['%', 'percentage'],
]);

export const methods = new Map<Method, Operator>([...operations.entries()]
  .map((operationMethod) => operationMethod.reverse() as [Method, Operator]));

export const mathPriority: Record<Method, number> = {
  add: 0,
  subtract: 0,
  percentage: 0,
  divide: 1,
  multiply: 1,
};

export const regexs = {
  operations: new RegExp(`[\\${[...operations.keys()].join('\\')}]`),
  number: /[\d.]/,
  brackets: /[()]/,
};
