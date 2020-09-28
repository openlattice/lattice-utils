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
import type { PropertyType } from 'lattice';

import { EDM, PROPERTY_TYPES, PROPERTY_TYPES_INDEX_MAP } from '../../constants/redux';
import { isNonEmptyString } from '../lang';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function selectPropertyTypes(idsOrNames :Set<UUID | string> | Array<UUID | string>) {

  return (state :Map) :Map<UUID, PropertyType> => {

    if (!_isArray(idsOrNames) && !isCollection(idsOrNames)) {
      return Map();
    }

    const propertyTypesMap = Map().withMutations((map :Map) => {
      idsOrNames.forEach((idOrName) => {
        if (isValidUUID(idOrName) || isNonEmptyString(idOrName)) {
          const propertyTypeIndex :number = getIn(state, [EDM, PROPERTY_TYPES_INDEX_MAP, idOrName], -1);
          if (propertyTypeIndex >= 0) {
            const propertyType :?PropertyType = getIn(state, [EDM, PROPERTY_TYPES, propertyTypeIndex]);
            if (propertyType && propertyType.id) {
              map.set(propertyType.id, propertyType);
            }
          }
        }
      });
    });

    return propertyTypesMap;
  };
}
