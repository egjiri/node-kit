import { Frequency } from './types';

export function getIntervalFromFrequency(frequency: Frequency): number {
  switch (frequency) {
    case Frequency.Weekly: return 52;
    case Frequency.Biweekly: return 26;
    case Frequency.SemiMonthly: return 24;
    case Frequency.Monthly: return 12;
    case Frequency.Bimonthly: return 6;
    case Frequency.Quarterly: return 4;
    case Frequency.Triannually: return 3;
    case Frequency.Yearly: return 1;
  }
}
