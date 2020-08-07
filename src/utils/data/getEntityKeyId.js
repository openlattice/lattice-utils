/*
 * @flow
 */

import { Map, getIn } from 'immutable';

import { OL_ID_FQN } from './constants';

import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function getEntityKeyId(entity :Object | Map) :?UUID {

  const entityKeyId = getIn(entity, [OL_ID_FQN, 0]);

  if (isValidUUID(entityKeyId)) {
    return entityKeyId;
  }

  return undefined;
}
