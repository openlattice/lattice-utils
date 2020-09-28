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
import type { EntityType } from 'lattice';

import { EDM, ENTITY_TYPES, ENTITY_TYPES_INDEX_MAP } from '../../constants/redux';
import { isNonEmptyString } from '../lang';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function selectEntityTypes(idsOrNames :Set<UUID | string> | Array<UUID | string>) {

  return (state :Map) :Map<UUID, EntityType> => {

    if (!_isArray(idsOrNames) && !isCollection(idsOrNames)) {
      return Map();
    }

    const entityTypesMap = Map().withMutations((map :Map) => {
      idsOrNames.forEach((idOrName) => {
        if (isValidUUID(idOrName) || isNonEmptyString(idOrName)) {
          const entityTypeIndex :number = getIn(state, [EDM, ENTITY_TYPES_INDEX_MAP, idOrName], -1);
          if (entityTypeIndex >= 0) {
            const entityType :?EntityType = getIn(state, [EDM, ENTITY_TYPES, entityTypeIndex]);
            if (entityType && entityType.id) {
              map.set(entityType.id, entityType);
            }
          }
        }
      });
    });

    return entityTypesMap;
  };
}
