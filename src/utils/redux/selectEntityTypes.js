/*
 * @flow
 */

import _isArray from 'lodash/isArray';
import {
  Map,
  Set,
  getIn,
  isCollection,
} from 'immutable';
import { Models } from 'lattice';
import type { EntityType } from 'lattice';

import { EDM, ENTITY_TYPES, ENTITY_TYPES_INDEX_MAP } from '../../constants/redux';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

const { FQN } = Models;

const EMPTY_MAP = Map();

export default function selectEntityTypes(idsOrTypes :Set<FQN | UUID | string> | Array<FQN | UUID | string>) {

  return (state :Map) :Map<UUID, EntityType> => {

    if (!_isArray(idsOrTypes) && !isCollection(idsOrTypes)) {
      return EMPTY_MAP;
    }

    const entityTypesMap = Map().withMutations((map :Map) => {
      idsOrTypes.forEach((idOrType) => {
        if (isValidUUID(idOrType) || FQN.isValid(idOrType)) {
          const entityTypeIndex :number = getIn(state, [EDM, ENTITY_TYPES_INDEX_MAP, idOrType], -1);
          if (entityTypeIndex >= 0) {
            const entityType :?EntityType = getIn(state, [EDM, ENTITY_TYPES, entityTypeIndex]);
            if (entityType && entityType.id) {
              map.set(entityType.id, entityType);
            }
          }
        }
      });
    });

    if (entityTypesMap.isEmpty()) {
      return EMPTY_MAP;
    }

    return entityTypesMap;
  };
}
