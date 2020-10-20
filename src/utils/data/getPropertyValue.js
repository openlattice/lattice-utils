/*
 * @flow
 */

import { Map, getIn } from 'immutable';
import { Models } from 'lattice';

const { FQN } = Models;

export default function getPropertyValue(
  entity :Map | Object,
  fqn :FQN | string,
  defaultValue ? :string = ''
) :any {

  return getIn(entity, [fqn, 0], defaultValue);
}
