/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { Models } from 'lattice';

import getPropertyValue from './getPropertyValue';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const { FQN } = Models;

const MOCK_VALUE = 'Test';
const MOCK_STRING_PROPERTY = 'ol.name';
const MOCK_FQN_PROPERTY = FQN.of(MOCK_STRING_PROPERTY);

const MOCK_ENTITY_MAP_USING_FQN = Map().set(MOCK_FQN_PROPERTY, List([MOCK_VALUE]));
const MOCK_ENTITY_OBJ_USING_FQN = MOCK_ENTITY_MAP_USING_FQN.toJS();

const MOCK_ENTITY_MAP_EMPTY_VALUE = Map().set(MOCK_FQN_PROPERTY, List());
const MOCK_ENTITY_OBJ_EMPTY_VALUE = MOCK_ENTITY_MAP_EMPTY_VALUE.toJS();

describe('DataUtils', () => {

  describe('getPropertyValue', () => {

    test('should return the property value when defined', () => {
      expect(getPropertyValue({ [MOCK_STRING_PROPERTY]: [MOCK_VALUE] }, MOCK_STRING_PROPERTY)).toEqual(MOCK_VALUE);
      expect(getPropertyValue(
        fromJS({ [MOCK_STRING_PROPERTY]: [MOCK_VALUE] }),
        MOCK_STRING_PROPERTY
      )).toEqual(MOCK_VALUE);
      expect(getPropertyValue(MOCK_ENTITY_OBJ_USING_FQN, MOCK_FQN_PROPERTY)).toEqual(MOCK_VALUE);
      expect(getPropertyValue(MOCK_ENTITY_MAP_USING_FQN, MOCK_FQN_PROPERTY)).toEqual(MOCK_VALUE);
    });

    test('should return the default value when property value is undefined', () => {
      expect(getPropertyValue({}, MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue(Map(), MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue({}, MOCK_FQN_PROPERTY)).toEqual('');
      expect(getPropertyValue(Map(), MOCK_FQN_PROPERTY)).toEqual('');

      expect(getPropertyValue({ [MOCK_STRING_PROPERTY]: [] }, MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue(fromJS({ [MOCK_STRING_PROPERTY]: [] }), MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue(MOCK_ENTITY_OBJ_EMPTY_VALUE, MOCK_FQN_PROPERTY)).toEqual('');
      expect(getPropertyValue(MOCK_ENTITY_MAP_EMPTY_VALUE, MOCK_FQN_PROPERTY)).toEqual('');

      expect(getPropertyValue({}, MOCK_STRING_PROPERTY, 'Default')).toEqual('Default');
      expect(getPropertyValue(Map(), MOCK_STRING_PROPERTY, 'Default')).toEqual('Default');
      expect(getPropertyValue({}, MOCK_FQN_PROPERTY, 'Default')).toEqual('Default');
      expect(getPropertyValue(Map(), MOCK_FQN_PROPERTY, 'Default')).toEqual('Default');
    });

    test('should return the default value when given invalid paramters', () => {
      expect(getPropertyValue({}, INVALID_PARAMS)).toEqual('');
      expect(getPropertyValue(Map(), INVALID_PARAMS)).toEqual('');
    });

  });

});
