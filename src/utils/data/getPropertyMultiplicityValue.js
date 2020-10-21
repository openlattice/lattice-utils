/*
 * @flow
 */

import {
  List,
  Map,
  get,
  isImmutable,
} from 'immutable';
import { Models } from 'lattice';

const { FQN } = Models;

export default function getPropertyMultiplicityValue(
  entity :Map | Object,
  fqn :FQN | string
) :any {

  const defaultValue = isImmutable(entity) ? List() : [];
  return get(entity, fqn, defaultValue);
}
