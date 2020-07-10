/*
 * @flow
 */

import { DateTime } from 'luxon';

import formatDateTime from './formatDateTime';
import { INVALID_DATE_TIME } from './constants';

export default function formatAsDate(value :string = '', fallback :string = INVALID_DATE_TIME) :string {

  return formatDateTime(value, DateTime.DATE_SHORT, fallback);
}
