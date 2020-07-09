/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

export default function isNonEmptyArray(value :any) :boolean %checks {

  return isArray(value) && !isEmpty(value);
}
