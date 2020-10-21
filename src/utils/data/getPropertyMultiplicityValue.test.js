/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { Models } from 'lattice';

import getPropertyMultiplicityValue from './getPropertyMultiplicityValue';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const { FQN } = Models;

const MOCK_VALUES = ['Test1', 'Test2', 'Test3'];
const MOCK_STRING_PROPERTY = 'ol.name';
const MOCK_FQN_PROPERTY = FQN.of(MOCK_STRING_PROPERTY);

describe('DataUtils', () => {

  describe('getPropertyValue', () => {

    test('should return the property value when defined', () => {
      expect(getPropertyMultiplicityValue(
        { [MOCK_STRING_PROPERTY]: MOCK_VALUES },
        MOCK_STRING_PROPERTY
      )).toEqual(MOCK_VALUES);
      expect(getPropertyMultiplicityValue(
        fromJS({ [MOCK_STRING_PROPERTY]: MOCK_VALUES }),
        MOCK_STRING_PROPERTY
      )).toEqual(fromJS(MOCK_VALUES));
      expect(getPropertyMultiplicityValue(
        { [MOCK_FQN_PROPERTY]: MOCK_VALUES },
        MOCK_FQN_PROPERTY
      )).toEqual(MOCK_VALUES);
      expect(getPropertyMultiplicityValue(
        fromJS({ [MOCK_FQN_PROPERTY]: MOCK_VALUES }),
        MOCK_FQN_PROPERTY
      )).toEqual(fromJS(MOCK_VALUES));
    });

    test('should return the default value when property value is undefined', () => {
      expect(getPropertyMultiplicityValue({}, MOCK_STRING_PROPERTY)).toEqual([]);
      expect(getPropertyMultiplicityValue(Map(), MOCK_STRING_PROPERTY)).toEqual(List());
      expect(getPropertyMultiplicityValue({}, MOCK_FQN_PROPERTY)).toEqual([]);
      expect(getPropertyMultiplicityValue(Map(), MOCK_FQN_PROPERTY)).toEqual(List());
    });

    test('should return the default value when given invalid paramters', () => {
      expect(getPropertyMultiplicityValue({}, INVALID_PARAMS)).toEqual([]);
      expect(getPropertyMultiplicityValue(Map(), INVALID_PARAMS)).toEqual(List());
    });

  });

});
