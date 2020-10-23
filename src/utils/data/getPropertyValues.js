/*
 * @flow
 */

import { Map, set } from 'immutable';
import { Models } from 'lattice';

import getPropertyValue from './getPropertyValue';

const { FQN } = Models;

export default function getPropertyValues(
  entity :Map | Object,
  fqns :Array<FQN | string>,
  fallback ?:boolean | number | string = '',
) :Object {

  let propertyValues = {};

  fqns.forEach((fqn :FQN | string) => {
    const value = getPropertyValue(entity, fqn, fallback);
    propertyValues = set(propertyValues, fqn, value);
  });

  return propertyValues;
}
