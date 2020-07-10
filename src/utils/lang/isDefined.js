/*
 * @flow
 */

import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

export default function isDefined(value :any) :boolean %checks {

  return !isNull(value) && !isUndefined(value);
}
