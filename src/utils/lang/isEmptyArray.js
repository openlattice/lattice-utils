/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

export default function isEmptyArray(value :any) :boolean %checks {

  return isArray(value) && isEmpty(value);
}
