/*
 * @flow
 */

import { List, Map } from 'immutable';

import selectEntitySets from './selectEntitySets';

import { EDM, ENTITY_SETS, ENTITY_SETS_INDEX_MAP } from '../../constants/redux';
import { INVALID_PARAMS } from '../../testing/InvalidParams';

const MOCK_ENTITY_SET = {
  id: '3212aff9-a5d6-409b-8fd7-2d7317ed4067',
  name: 'MockEntitySetName',
  title: 'MockEntitySetTitle',
};

const MOCK_STORE = Map({
  [EDM]: Map({
    [ENTITY_SETS]: List([MOCK_ENTITY_SET]),
    [ENTITY_SETS_INDEX_MAP]: Map({
      [MOCK_ENTITY_SET.id]: 0,
      [MOCK_ENTITY_SET.name]: 0,
    }),
  }),
});

describe('ReduxUtils', () => {

  describe('selectEntitySets', () => {

    test('should return a map of EntitySets', () => {
      const entitySets1 = selectEntitySets([MOCK_ENTITY_SET.id])(MOCK_STORE);
      const entitySets2 = selectEntitySets([MOCK_ENTITY_SET.name])(MOCK_STORE);
      expect(entitySets1.get(MOCK_ENTITY_SET.id)).toEqual(MOCK_ENTITY_SET);
      expect(entitySets2.get(MOCK_ENTITY_SET.id)).toEqual(MOCK_ENTITY_SET);
      expect(entitySets1.toJS()).toEqual({ [MOCK_ENTITY_SET.id]: MOCK_ENTITY_SET });
      expect(entitySets2.toJS()).toEqual({ [MOCK_ENTITY_SET.id]: MOCK_ENTITY_SET });
    });

    test('should correctly handle invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(16) // 'invalid_special_string_value'
        .forEach((invalidParam) => {
          let result = selectEntitySets(invalidParam)(MOCK_STORE);
          if (!Map().equals(result)) {
            errors.push(
              `selectEntitySets(${JSON.stringify(invalidParam)})(...)`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
          result = selectEntitySets([invalidParam])(MOCK_STORE);
          if (!Map().equals(result)) {
            errors.push(
              `selectEntitySets([${JSON.stringify(invalidParam)}])(...)`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
          result = selectEntitySets([MOCK_ENTITY_SET.id])(invalidParam);
          if (!Map().equals(result)) {
            errors.push(
              `selectEntitySets(...)([${JSON.stringify(invalidParam)}])`
              + ` - expected Map(), got ${JSON.stringify(result)}`
            );
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
