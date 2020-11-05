/*
 * @flow
 */

/* eslint-disable no-redeclare */

import { get, getIn } from 'immutable';
import { Models } from 'lattice';

import { isNonEmptyArray } from '../lang';

const { FQN } = Models;

declare function getPropertyValue<DT, FB :boolean | number | string>(
  entity :any,
  key :[FQN, number] | [string, number],
  fallback ?:FB,
) :DT | FB;

declare function getPropertyValue<DT, FB :boolean | number | string>(
  entity :any,
  key :FQN | string,
  fallback ?:FB,
) :Array<DT> | FB;

export default function getPropertyValue(entity, key, fallback = '') {

  if (isNonEmptyArray(key)) {
    return getIn(entity, key, fallback);
  }

  if (FQN.isValid(key)) {
    return get(entity, key, fallback);
  }

  return fallback;
}
