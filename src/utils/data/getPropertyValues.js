/*
 * @flow
 */

import { Map } from 'immutable';
import { Models } from 'lattice';

import getPropertyValue from './getPropertyValue';

const { FQN } = Models;

export default function getPropertyValues(
  entity :Map | Object,
  fqns :any[],
  defaultValue ? :string = ''
) :any {

  return fqns.map((fqn :FQN | string) => getPropertyValue(entity, fqn, defaultValue));
}
