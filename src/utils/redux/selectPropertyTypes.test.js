/*
 * @flow
 */

import { List, Map } from 'immutable';
import { Models } from 'lattice';

import selectPropertyTypes from './selectPropertyTypes';

import { EDM, PROPERTY_TYPES, PROPERTY_TYPES_INDEX_MAP } from '../../constants/redux';
import { INVALID_PARAMS } from '../../testing/InvalidParams';

const { FQN } = Models;

const MOCK_PROPERTY_TYPE = {
  id: 'afd4d995-e05f-4b63-a4d7-416138e27905',
  title: 'MockPropertyTypeTitle',
  type: FQN.of('mock.propertytype'),
};

const MOCK_STORE = Map({
  [EDM]: Map({
    [PROPERTY_TYPES]: List([MOCK_PROPERTY_TYPE]),
    [PROPERTY_TYPES_INDEX_MAP]: Map({
      [MOCK_PROPERTY_TYPE.id]: 0,
      // $FlowFixMe
      [MOCK_PROPERTY_TYPE.type]: 0,
    }),
  }),
});

describe('ReduxUtils', () => {

  describe('selectPropertyTypes', () => {

    test('should return a map of PropertyTypes', () => {
      const propertyTypes1 = selectPropertyTypes([MOCK_PROPERTY_TYPE.id])(MOCK_STORE);
      const propertyTypes2 = selectPropertyTypes([MOCK_PROPERTY_TYPE.type])(MOCK_STORE);
      expect(propertyTypes1.get(MOCK_PROPERTY_TYPE.id)).toEqual(MOCK_PROPERTY_TYPE);
      expect(propertyTypes2.get(MOCK_PROPERTY_TYPE.id)).toEqual(MOCK_PROPERTY_TYPE);
      expect(propertyTypes1.toJS()).toEqual({ [MOCK_PROPERTY_TYPE.id]: MOCK_PROPERTY_TYPE });
      expect(propertyTypes2.toJS()).toEqual({ [MOCK_PROPERTY_TYPE.id]: MOCK_PROPERTY_TYPE });
    });

    test('should correctly handle invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(16) // 'invalid_special_string_value'
        .forEach((invalidParam) => {
          let result = selectPropertyTypes(invalidParam)(MOCK_STORE);
          if (!Map().equals(result)) {
            errors.push(
              `selectPropertyTypes(${JSON.stringify(invalidParam)})(...)`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
          result = selectPropertyTypes([invalidParam])(MOCK_STORE);
          if (!Map().equals(result)) {
            errors.push(
              `selectPropertyTypes([${JSON.stringify(invalidParam)}])(...)`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
          result = selectPropertyTypes([MOCK_PROPERTY_TYPE.id])(invalidParam);
          if (!Map().equals(result)) {
            errors.push(
              `selectPropertyTypes(...)([${JSON.stringify(invalidParam)}])`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
