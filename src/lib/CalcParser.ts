import { mathPriority, regexs, methods } from './constants';

import type { Method } from './types';

export class CalcParser {
  private _expression: string;

  constructor(expression: string) {
    this._expression = expression;
  }

  public get expression() {
    return this._expression;
  }

  public priority() {
    const priorityLevels = Object.entries(mathPriority).reduce<Method[][]>(
      (acc, [method, level]) => {
        if (acc[level]) acc[level].push(method as Method);
        else acc[level] = [method as Method];

        return acc;
      }, [],
    ).reverse();

    const priorityExpression = priorityLevels.reduce((acc, current) => {
      const numbersRegex = `${regexs.number.source}+`;

      const operators = current.map((method) => methods.get(method));
      const regex = new RegExp(`(${numbersRegex}[${operators.join('\\')}])+${numbersRegex}`, 'g');

      return acc.replace(regex, (exp) => `(${exp})`);
    }, this.expression);

    this._expression = priorityExpression;

    return this;
  }

  public removeSpace() {
    this._expression = this.expression.replace(/\s/g, '');

    return this;
  }

  public final(): string[] {
    const initial = this._expression.split(regexs.operations)[0];
    const exprResult = this.expression.match(new RegExp(
      `(${regexs.operations.source}${regexs.number.source}*)`, 'g',
    )) ?? [];

    return [initial, ...Array.from(exprResult)];
  }
}
export default CalcParser;
