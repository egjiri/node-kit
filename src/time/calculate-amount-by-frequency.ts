import { Frequency } from './types.js';

export function calculateAmountByFrequency(
  currentAmount: number,
  currentFrequency: Frequency,
  desiredFrequency: Frequency,
): number {
  const monthlyAmount = calculateMonthlyAmount(currentAmount, currentFrequency);
  switch (desiredFrequency) {
    case Frequency.Weekly: return monthlyAmount * 12 / 52;
    case Frequency.Biweekly: return monthlyAmount * 12 / 26;
    case Frequency.SemiMonthly: return monthlyAmount * 12 / 24;
    case Frequency.Monthly: return monthlyAmount;
    case Frequency.Bimonthly: return monthlyAmount * 2;
    case Frequency.Quarterly: return monthlyAmount * 3;
    case Frequency.Triannually: return monthlyAmount * 4;
    case Frequency.Yearly: return monthlyAmount * 12;
  }
}

function calculateMonthlyAmount(
  currentAmount: number,
  currentFrequency: Frequency,
): number {
  switch (currentFrequency) {
    case Frequency.Weekly: return currentAmount * 52 / 12;
    case Frequency.Biweekly: return currentAmount * 26 / 12;
    case Frequency.SemiMonthly: return currentAmount * 24 / 12;
    case Frequency.Monthly: return currentAmount;
    case Frequency.Bimonthly: return currentAmount / 2;
    case Frequency.Quarterly: return currentAmount / 3;
    case Frequency.Triannually: return currentAmount / 4;
    case Frequency.Yearly: return currentAmount / 12;
  }
}
