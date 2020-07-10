/*
 * @flow
 */

import { Map, getIn } from 'immutable';

import { OL_ID_FQN } from './constants';
import type { UUID } from './types';

import { isValidUUID } from '../validation';

export default function getEntityKeyId(entity :Object | Map) :?UUID {

  const entityKeyId = getIn(entity, [OL_ID_FQN, 0]);

  if (isValidUUID(entityKeyId)) {
    return entityKeyId;
  }

  return undefined;
}
