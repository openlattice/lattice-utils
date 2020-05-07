/*
 * @flow
 */

import { DateTime } from 'luxon';

function formatAsDate(value :string = '', valueIfInvalid :string = '---') :string {

  const date = DateTime.fromISO(value);
  if (date.isValid) {
    return date.toLocaleString(DateTime.DATE_SHORT);
  }

  return valueIfInvalid;
}

export {
  formatAsDate,
};
