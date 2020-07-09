/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';

export default function isEmptyObject(value :any) :boolean %checks {

  return isPlainObject(value) && isEmpty(value);
}
