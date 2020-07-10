/*
 * @flow
 */

import { DateTime } from 'luxon';

import { INVALID_DATE_TIME } from './constants';

// import type { IntlDateTimeFormatOptions } from 'luxon';

export default function formatDateTime(
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
