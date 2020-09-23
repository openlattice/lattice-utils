/*
 * @flow
 */

import { List, Map } from 'immutable';

import selectEntityTypes from './selectEntityTypes';

import { EDM, ENTITY_TYPES, ENTITY_TYPES_INDEX_MAP } from '../../constants/redux';
import { INVALID_PARAMS } from '../../testing/InvalidParams';

const MOCK_ENTITY_TYPE = {
  id: 'afd4d995-e05f-4b63-a4d7-416138e27905',
  name: 'MockEntityTypeName',
  title: 'MockEntityTypeTitle',
};

const MOCK_STORE = Map({
  [EDM]: Map({
    [ENTITY_TYPES]: List([MOCK_ENTITY_TYPE]),
    [ENTITY_TYPES_INDEX_MAP]: Map({
      [MOCK_ENTITY_TYPE.id]: 0,
      [MOCK_ENTITY_TYPE.name]: 0,
    }),
  }),
});

describe('ReduxUtils', () => {

  describe('selectEntityTypes', () => {

    test('should return a map of EntitySets', () => {
      const entityTypes1 = selectEntityTypes([MOCK_ENTITY_TYPE.id])(MOCK_STORE);
      const entityTypes2 = selectEntityTypes([MOCK_ENTITY_TYPE.name])(MOCK_STORE);
      expect(entityTypes1.get(MOCK_ENTITY_TYPE.id)).toEqual(MOCK_ENTITY_TYPE);
      expect(entityTypes2.get(MOCK_ENTITY_TYPE.id)).toEqual(MOCK_ENTITY_TYPE);
      expect(entityTypes1.toJS()).toEqual({ [MOCK_ENTITY_TYPE.id]: MOCK_ENTITY_TYPE });
      expect(entityTypes2.toJS()).toEqual({ [MOCK_ENTITY_TYPE.id]: MOCK_ENTITY_TYPE });
    });

    test('should correctly handle invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(16) // 'invalid_special_string_value'
        .forEach((invalidParam) => {
          let result = selectEntityTypes(invalidParam)(MOCK_STORE);
          if (!Map().equals(result)) {
            errors.push(
              `selectEntityTypes(${JSON.stringify(invalidParam)})(...)`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
          result = selectEntityTypes([invalidParam])(MOCK_STORE);
          if (!Map().equals(result)) {
            errors.push(
              `selectEntityTypes([${JSON.stringify(invalidParam)}])(...)`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
          result = selectEntityTypes([MOCK_ENTITY_TYPE.id])(invalidParam);
          if (!Map().equals(result)) {
            errors.push(
              `selectEntityTypes(...)([${JSON.stringify(invalidParam)}])`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
