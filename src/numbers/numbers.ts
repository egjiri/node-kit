import { addSeparator } from '../strings/strings';

export type format = 'percentage' | 'currency'

export function formatNumber(num: number, format: format): string {
  const value = toString(num);
  if (format === 'percentage') {
    return value + '%';
  } else if (format === 'currency') {
    return '$' + value;
  }
}

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
