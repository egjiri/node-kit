import { addSeparator } from '../strings/strings';

export type Format = 'percentage' | 'currency'

export function formatNumber(num: number, format?: Format) {
  const value = toString(num);
  if (format === 'percentage') {
    return value + '%';
  } else if (format === 'currency') {
    return '$' + value;
  } else {
    return value;
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
