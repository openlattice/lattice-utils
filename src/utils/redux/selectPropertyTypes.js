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
import type { PropertyType } from 'lattice';

import { EDM, PROPERTY_TYPES, PROPERTY_TYPES_INDEX_MAP } from '../../constants/redux';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

const { FQN } = Models;

const EMPTY_MAP = Map();

export default function selectPropertyTypes(idsOrTypes :Set<FQN | UUID | string> | Array<FQN | UUID | string>) {

  return (state :Map) :Map<UUID, PropertyType> => {

    if (!_isArray(idsOrTypes) && !isCollection(idsOrTypes)) {
      return EMPTY_MAP;
    }

    const propertyTypesMap = Map().withMutations((map :Map) => {
      idsOrTypes.forEach((idOrType :FQN | UUID | string) => {
        if (isValidUUID(idOrType) || FQN.isValid(idOrType)) {
          const propertyTypeIndex :number = getIn(state, [EDM, PROPERTY_TYPES_INDEX_MAP, idOrType], -1);
          if (propertyTypeIndex >= 0) {
            const propertyType :?PropertyType = getIn(state, [EDM, PROPERTY_TYPES, propertyTypeIndex]);
            if (propertyType && propertyType.id) {
              map.set(propertyType.id, propertyType);
            }
          }
        }
      });
    });

    if (propertyTypesMap.isEmpty()) {
      return EMPTY_MAP;
    }

    return propertyTypesMap;
  };
}
