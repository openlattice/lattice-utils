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
import type { EntitySet } from 'lattice';

import { EDM, ENTITY_SETS, ENTITY_SETS_INDEX_MAP } from '../../constants/redux';
import { isNonEmptyString } from '../lang';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function selectEntitySets(idsOrNames :Set<UUID | string> | Array<UUID | string>) {

  return (state :Map) :Map<UUID, EntitySet> => {

    if (!_isArray(idsOrNames) && !isCollection(idsOrNames)) {
      return Map();
    }

    const entitySetsMap = Map().withMutations((map :Map) => {
      idsOrNames.forEach((idOrName) => {
        if (isValidUUID(idOrName) || isNonEmptyString(idOrName)) {
          const entitySetIndex :number = getIn(state, [EDM, ENTITY_SETS_INDEX_MAP, idOrName], -1);
          if (entitySetIndex >= 0) {
            const entitySet :?EntitySet = getIn(state, [EDM, ENTITY_SETS, entitySetIndex]);
            if (entitySet && entitySet.id) {
              map.set(entitySet.id, entitySet);
            }
          }
        }
      });
    });

    return entitySetsMap;
  };
}
