/*
 * @flow
 */

import { DateTime } from 'luxon';

import formatDateTime from './formatDateTime';
import { INVALID_DATE_TIME } from './constants';

export default function formatAsTime(value :string = '', fallback :string = INVALID_DATE_TIME) :string {

  return formatDateTime(value, DateTime.TIME_SIMPLE, fallback);
}
