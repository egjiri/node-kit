import { addSeparator } from '../../strings';

export function toString(num: number, numberOfDecimals?: number): string {
  const [integral, fractal] = num.toString().split('.');
  let value = addSeparator(integral);
  if (fractal) {
    let decimals = fractal.length;
    if (typeof numberOfDecimals === 'number') {
      decimals = numberOfDecimals;
    }
    if (decimals > 0) {
      value += '.' + (fractal + '0000000000').split('', decimals).join('');
    }
  }
  return value;
}
