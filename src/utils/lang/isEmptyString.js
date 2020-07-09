/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

export default function isEmptyString(value :any) :boolean %checks {

  return isString(value) && isEmpty(value);
}
