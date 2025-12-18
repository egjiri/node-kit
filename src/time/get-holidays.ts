import { addDays } from './add-days';
import { getNthWeekdayOfMonth } from './get-nth-weekday-of-month';
import { DayOfWeek, Month, Week } from './types';

enum Holiday {
  NewYearsDay = "New Year's Day",
  FamilyDay = 'Family Day',
  GoodFriday = 'Good Friday',
  EasterMonday = 'Easter Monday',
  VictoriaDay = 'Victoria Day',
  CanadaDay = 'Canada Day',
  CivicHoliday = 'Civic Holiday',
  LabourDay = 'Labour Day',
  NationalDayForTruthAndReconciliation = 'National Day for Truth and Reconciliation',
  Thanksgiving = 'Thanksgiving',
  RemembranceDay = 'Remembrance Day',
  ChristmasDay = 'Christmas Day',
  BoxingDay = 'Boxing Day',
}

export type OntarioHolidays = Exclude<Holiday,
  | Holiday.EasterMonday
  | Holiday.NationalDayForTruthAndReconciliation
  | Holiday.RemembranceDay
>;

export function getHolidays(): Holiday[] {
  return Object.values(Holiday);
}

export function getOntarioHolidays(): OntarioHolidays[] {
  const notOntarioHolidays = [Holiday.EasterMonday, Holiday.NationalDayForTruthAndReconciliation, Holiday.RemembranceDay];
  return getHolidays().filter(holiday => !notOntarioHolidays.includes(holiday)) as OntarioHolidays[];
}

// Reference: https://www.statutoryholidays.com/ontario.php
export function getHolidayDates(year: number): Record<Holiday, Date> {
  const easterSunday = getEasterSunday(year);

  /* eslint-disable stylistic/no-multi-spaces,stylistic/key-spacing */
  return {
    [Holiday.NewYearsDay]:    new Date(year, Month.January, 1),                                          // New Year's Day (January 1)
    [Holiday.FamilyDay]:      getNthWeekdayOfMonth(Week.Third, DayOfWeek.Monday, Month.February, year),  // Family Day (Third Monday in February)
    [Holiday.GoodFriday]:     addDays(easterSunday, -2),                                                 // Good Friday (Friday before Easter Sunday)
    [Holiday.EasterMonday]:   addDays(easterSunday, 1),                                                  // Easter Monday (Monday after Easter Sunday)
    [Holiday.VictoriaDay]:    getVictoriaDay(year),                                                      // Victoria Day (Last Monday before May 25)
    [Holiday.CanadaDay]:      new Date(year, Month.July, 1),                                             // Canada Day (July 1)
    [Holiday.CivicHoliday]:   getNthWeekdayOfMonth(Week.First, DayOfWeek.Monday, Month.August, year),    // Civic Holiday (First Monday in August)
    [Holiday.LabourDay]:      getNthWeekdayOfMonth(Week.First, DayOfWeek.Monday, Month.September, year), // Labour Day (First Monday in September)
    [Holiday.NationalDayForTruthAndReconciliation]: new Date(year, Month.September, 30),                 // National Day for Truth and Reconciliation
    [Holiday.Thanksgiving]:   getNthWeekdayOfMonth(Week.Second, DayOfWeek.Monday, Month.October, year),  // Thanksgiving (Second Monday in October)
    [Holiday.RemembranceDay]: new Date(year, Month.November, 11),                                        // Remembrance Day (November 11)
    [Holiday.ChristmasDay]:   new Date(year, Month.December, 25),                                        // Christmas Day (December 25)
    [Holiday.BoxingDay]:      new Date(year, Month.December, 26),                                        // Boxing Day (December 26)
  };
  /* eslint-enable stylistic/no-multi-spaces,stylistic/key-spacing */
}

// Source: https://gist.github.com/johndyer/0dffbdd98c2046f41180c051f378f343
function getEasterSunday(year: number): Date {
  const f = Math.floor;
  // Golden Number - 1
  const G = year % 19;
  const C = f(year / 100);
  // related to Epact
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  // number of days from 21 March to the Paschal full moon
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  // weekday for the Paschal full moon
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  // number of days from 21 March to the Sunday on or before the Paschal full moon
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const day = L + 28 - 31 * f(month / 4);

  return new Date(year, month - 1, day);
}

// Victoria Day (Last Monday before May 25)
function getVictoriaDay(year: number): Date {
  const dayOfWeek = new Date(year, Month.May, 25).getDay();
  const offsetToMonday = (7 - DayOfWeek.Monday + dayOfWeek) % 7 || 7;
  return new Date(year, Month.May, 25 - offsetToMonday);
}
