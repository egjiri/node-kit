import { getLastDayOfYear } from './get-last-day-of-year.js';
import { getMonthlyDates } from './get-monthly-dates.js';
import { getWeeklyDates } from './get-weekly-dates.js';
import { getYearlyDates } from './get-yearly-dates.js';
import { Frequency, isDayOfMonth, isDayOfWeek } from './types.js';
import type { DayOfMonth, DayOfWeek } from './types.js';

// TODO: Add support for generating anticipated transactions for the other frequency types (ex. Biweekly, Quarterly, etc.)
export const RECURRING_TRANSACTION_SUPPORTED_FREQUENCIES = [Frequency.Weekly, Frequency.SemiMonthly, Frequency.Monthly, Frequency.Yearly] as const;

type RecurringTransactionSupportedFrequency = typeof RECURRING_TRANSACTION_SUPPORTED_FREQUENCIES[number];

export function isRecurringTransactionSupportedFrequency(frequency: Frequency): frequency is RecurringTransactionSupportedFrequency {
  return RECURRING_TRANSACTION_SUPPORTED_FREQUENCIES.includes(frequency as RecurringTransactionSupportedFrequency);
}

export function getRecurringDates(frequency: RecurringTransactionSupportedFrequency, days: DayOfWeek[] | DayOfMonth[] | null | undefined, startDate: Date, endDate = getLastDayOfYear('next-year')): Date[] {
  if (frequency === Frequency.Yearly) {
    return getYearlyDates(startDate, endDate);
  }

  if (!days || days.length === 0) {
    throw new Error('Invalid "days"! It must be a non-empty array of DayOfWeek[] or DayOfMonth[]');
  }

  if (frequency === Frequency.Weekly) {
    const dayOfWeek = days[0];
    if (!isDayOfWeek(dayOfWeek)) {
      throw new Error('Invalid "startDay"! It must be a DayOfWeek when frequency is Weekly');
    }
    return getWeeklyDates(dayOfWeek, startDate, endDate);
  }

  if ([Frequency.SemiMonthly, Frequency.Monthly].includes(frequency)) {
    if (days.find(day => !isDayOfMonth(day))) {
      throw new Error('Invalid "days"! All elements must be DayOfMonth when frequency is SemiMonthly or Monthly');
    }

    const daysOfMonth = days as DayOfMonth[];

    if (frequency === Frequency.SemiMonthly) {
      return daysOfMonth.map(startDay => getMonthlyDates(startDay, startDate, endDate)).flat();
    } else {
      return getMonthlyDates(daysOfMonth[0], startDate, endDate);
    }
  }

  throw new Error(`Unsupported frequency: ${frequency}`);
}
