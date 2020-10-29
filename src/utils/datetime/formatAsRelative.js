/*
 * @flow
 */

import { DateTime, Interval } from 'luxon';

import formatDateTime from './formatDateTime';
import { INVALID_DATE_TIME, RELATIVE_TIMES } from './constants';

export default function formatAsRelative(
  value :string = '',
  format :Intl$DateTimeFormatOptions = DateTime.DATE_SHORT, // luxon doesn't export IntlDateTimeFormatOptions yet
  fallback :string = INVALID_DATE_TIME
) :string {
  let relativeDate = formatDateTime(value, format, fallback);
  const valueDT = DateTime.fromISO(value);
  const today = DateTime.local();
  const yesterday = today.minus({ days: 1 });
  const oneWeekAgo = today.minus({ weeks: 1 });
  const oneMonthAgo = today.minus({ months: 1 });
  const oneYearAgo = today.minus({ years: 1 });

  if (today.hasSame(valueDT, 'day')) {
    relativeDate = RELATIVE_TIMES.TODAY;
  }
  else if (yesterday.hasSame(valueDT, 'day')) {
    relativeDate = RELATIVE_TIMES.YESTERDAY;
  }
  // if more than two days ago but less than a year ago
  else if (Interval.fromDateTimes(oneYearAgo, yesterday).contains(valueDT)) {
    if (valueDT.valueOf() < oneMonthAgo.valueOf()) {
      // $FlowFixMe
      relativeDate = valueDT.toRelative({ unit: 'months' });
    }
    // if less than a month ago
    else if (valueDT.valueOf() < oneWeekAgo.valueOf()) {
      // $FlowFixMe
      relativeDate = valueDT.toRelative({ unit: 'weeks' });
    }
    // if less than a week ago
    else {
      // $FlowFixMe
      relativeDate = valueDT.toRelative({ unit: 'days' });
    }
  }

  return relativeDate;
}
