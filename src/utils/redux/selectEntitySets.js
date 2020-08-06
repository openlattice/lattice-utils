/*
 * @flow
 */

import { Map, Set, isCollection } from 'immutable';

import { EDM, ENTITY_SETS, ENTITY_SETS_INDEX_MAP } from '../../constants/redux';
import { isNonEmptyArray, isNonEmptyString } from '../lang';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function selectEntitySets<EntitySet>(idsOrNames :Array<UUID | string> | Set<UUID | string>) {

  return (state :Map) :Map<UUID, EntitySet> => {

    const isValid = (
      (isNonEmptyArray(idsOrNames) || isCollection(idsOrNames))
      && (
        idsOrNames.every(isValidUUID) || idsOrNames.every(isNonEmptyString)
      )
    );

    if (!isValid || !idsOrNames) {
      return Map();
    }

    const entitySetsMap = Map().withMutations((map :Map) => {
      idsOrNames.forEach((idOrName) => {
        const entitySetIndex :number = state.getIn([EDM, ENTITY_SETS_INDEX_MAP, idOrName], -1);
        if (entitySetIndex >= 0) {
          const entitySet :?EntitySet = state.getIn([EDM, ENTITY_SETS, entitySetIndex]);
          if (entitySet && entitySet.id) {
            map.set(entitySet.id, entitySet);
          }
        }
      });
    });

    return entitySetsMap;
  };
}
