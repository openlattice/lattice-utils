/*
 * @flow
 */

import { DateTime } from 'luxon';
// import type { IntlDateTimeFormatOptions } from 'luxon';

const INVALID_DATE_TIME :'---' = '---';

function formatDateTime(
  value :string = '',
  format :Intl$DateTimeFormatOptions, // luxon doesn't export IntlDateTimeFormatOptions yet
  fallback :string = INVALID_DATE_TIME,
) :string {

  const datetime = DateTime.fromISO(value);
  if (datetime.isValid) {
    return datetime.toLocaleString((format :any));
  }

  return fallback;
}

function formatAsDate(value :string = '', fallback :string = INVALID_DATE_TIME) :string {

  return formatDateTime(value, DateTime.DATE_SHORT, fallback);
}

function formatAsTime(value :string = '', fallback :string = INVALID_DATE_TIME) :string {

  return formatDateTime(value, DateTime.TIME_SIMPLE, fallback);
}

function calculateAge(value :string = '') :number {

  const datetime = DateTime.fromISO(value);
  if (datetime.isValid) {
    return datetime.until(DateTime.local()).toDuration('years').years;
  }

  return -1;
}

export {
  calculateAge,
  formatAsDate,
  formatAsTime,
  formatDateTime,
};
