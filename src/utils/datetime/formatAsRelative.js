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
  const yesterday = DateTime.local().minus({ days: 1 });
  const oneWeekAgo = DateTime.local().minus({ weeks: 1 });
  const oneMonthAgo = DateTime.local().minus({ months: 1 });
  const oneYearAgo = DateTime.local().minus({ years: 1 });

  if (today.hasSame(valueDT, 'day')) relativeDate = RELATIVE_TIMES.TODAY;
  else if (yesterday.hasSame(valueDT, 'day')) relativeDate = RELATIVE_TIMES.YESTERDAY;
  // if more than two days ago but less than a year ago
  else if (Interval.fromDateTimes(oneYearAgo, yesterday).contains(valueDT)) {
    // $FlowFixMe
    if (valueDT.valueOf() < oneMonthAgo.valueOf()) relativeDate = valueDT.toRelative({ unit: 'months' });
    // if less than a month ago
    // $FlowFixMe
    else if (valueDT.valueOf() < oneWeekAgo.valueOf()) relativeDate = valueDT.toRelative({ unit: 'weeks' });
    // if less than a week ago
    // $FlowFixMe
    else relativeDate = valueDT.toRelative({ unit: 'days' });
  }

  return relativeDate;
}
