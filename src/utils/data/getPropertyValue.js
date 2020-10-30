/*
 * @flow
 */

import isObject from 'lodash/isObject';
import {
  List,
  Map,
  get,
  getIn,
} from 'immutable';
import { Models } from 'lattice';

import { isNonEmptyArray, isNonEmptyString } from '../lang';

const { FQN } = Models;

export default function getPropertyValue(
  entity :Map | Object,
  key :FQN | string | Array<FQN | string | number>,
  fallback ?:boolean | number | string = '',
) :boolean | number | string | Array<boolean | number | string> | List {

  if (isNonEmptyArray(key)) {
    return getIn(entity, key, fallback);
  }
  if (isNonEmptyString(key) || isObject(key)) {
    return get(entity, key, fallback);
  }

  return fallback;
}
