/*
 * @flow
 */

import { DateTime } from 'luxon';

export default function calculateAge(value :string = '') :number {

  const datetime = DateTime.fromISO(value);
  if (datetime.isValid) {
    return datetime.until(DateTime.local()).toDuration('years').years;
  }

  return -1;
}
