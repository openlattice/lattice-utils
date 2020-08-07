/*
 * @flow
 */

import {
  Map,
  Set,
  getIn,
  isCollection,
} from 'immutable';

import { EDM, ENTITY_SETS, ENTITY_SETS_INDEX_MAP } from '../../constants/redux';
import { isNonEmptyArray, isNonEmptyString } from '../lang';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function selectEntitySets<ES>(idsOrNames :Set<UUID | string> | Array<UUID | string>) {

  return (state :Map) :Map<UUID, ES> => {

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
        const entitySetIndex :number = getIn(state, [EDM, ENTITY_SETS_INDEX_MAP, idOrName], -1);
        if (entitySetIndex >= 0) {
          const entitySet :?ES = getIn(state, [EDM, ENTITY_SETS, entitySetIndex]);
          if (entitySet && entitySet.id) {
            map.set(entitySet.id, entitySet);
          }
        }
      });
    });

    return entitySetsMap;
  };
}
