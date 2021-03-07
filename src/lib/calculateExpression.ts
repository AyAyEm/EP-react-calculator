import { arithmeticOperation } from './arithmeticOperation';
import { CalcParser } from './CalcParser';
import { operations, regexs } from './constants';

import type { Method, Operator } from './types';

export function calculateExpression(expression: string) {
  let finalExpression = expression;

  if (!calculateExpression.inRecursion) {
    finalExpression = new CalcParser(finalExpression)
      .removeSpace()
      .priority()
      .expression;
  }

  if (regexs.brackets.test(finalExpression)) {
    const resolveExpression = (expr = expression): string => expr.replace(/\(.*?\)/g, (substr) => {
      calculateExpression.inRecursion = true;
      const withoutBrackets = substr.slice(1, -1);

      let resolvedExpression = withoutBrackets;
      if (regexs.brackets.test(withoutBrackets)) {
        resolvedExpression = resolveExpression(resolvedExpression);
      }

      const result = calculateExpression(resolvedExpression);
      return String(result);
    });

    finalExpression = resolveExpression();
    calculateExpression.inRecursion = false;
  }
  const [initial, ...parsed] = new CalcParser(finalExpression).removeSpace().final();

  return parsed.reduce<number>((acc, expr) => {
    const [operator, ...operand] = expr;

    const method = operations.get(operator as Operator);
    if (!method) return 0;

    return arithmeticOperation(
      method as Method,
      acc,
      +operand.join(''),
    );
  }, +initial);
}
calculateExpression.inRecursion = false;
export default calculateExpression;
