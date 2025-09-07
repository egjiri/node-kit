import {
  addDays,
  addYears,
  calculateAmountByFrequency,
  formatDate, formatStandardDate,
  getHolidays, getOntarioHolidays, getHolidayDates,
  getIntervalFromFrequency,
  getLastDayOfYear,
  getNextBusinessDay,
  getNumberOfDaysInYear,
  getRecurringDates, isRecurringTransactionSupportedFrequency, RECURRING_TRANSACTION_SUPPORTED_FREQUENCIES,
  getYearlyDates,
  isValidDateString,
  isWeekend,
  timeAgo,
  withinXDays,
  DayOfWeek, Frequency, Month, RelativeTime, Week, isDayOfMonth, isDayOfWeek,
} from '.';

test('expors', () => {
  [
    addDays,
    addYears,
    calculateAmountByFrequency,
    formatDate, formatStandardDate,
    getHolidays, getOntarioHolidays, getHolidayDates,
    getIntervalFromFrequency,
    getLastDayOfYear,
    getNextBusinessDay,
    getNumberOfDaysInYear,
    getRecurringDates, isRecurringTransactionSupportedFrequency, RECURRING_TRANSACTION_SUPPORTED_FREQUENCIES,
    getYearlyDates,
    isValidDateString,
    isWeekend,
    timeAgo,
    withinXDays,
    DayOfWeek, Frequency, Month, RelativeTime, Week, isDayOfMonth, isDayOfWeek,
  ].map(item => expect(item).toBeDefined());
});
