/*
 * @flow
 */

import { DateTime } from 'luxon';

import { RELATIVE_TIMES } from './constants';

export default function formatAsRelative(
  value :string = '',
  fallback ?:string = ''
) :string {
  const valueDT = DateTime.fromISO(value);
  const today = DateTime.local();
  const yesterday = today.minus({ days: 1 });

  if (today.hasSame(valueDT, 'day')) {
    return RELATIVE_TIMES.TODAY;
  }
  if (yesterday.hasSame(valueDT, 'day')) {
    return RELATIVE_TIMES.YESTERDAY;
  }
  if (valueDT.isValid) {
    // $FlowFixMe
    return valueDT.toRelative();
  }
  return fallback;
}
