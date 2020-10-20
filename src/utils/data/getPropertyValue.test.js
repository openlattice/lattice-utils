/*
 * @flow
 */

import { Map, fromJS } from 'immutable';
import { Models } from 'lattice';

import getPropertyValue from './getPropertyValue';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const { FullyQualifiedName } = Models;

const MOCK_VALUE = 'Test';
const MOCK_STRING_PROPERTY = 'ol.name';
const MOCK_FQN_PROPERTY = new FullyQualifiedName(MOCK_STRING_PROPERTY);

describe('DataUtils', () => {

  describe('getPropertyValue', () => {

    test('should return the property value when defined', () => {
      expect(getPropertyValue({ [MOCK_STRING_PROPERTY]: [MOCK_VALUE] }, MOCK_STRING_PROPERTY)).toEqual(MOCK_VALUE);
      expect(getPropertyValue(
        fromJS({ [MOCK_STRING_PROPERTY]: [MOCK_VALUE] }),
        MOCK_STRING_PROPERTY
      )).toEqual(MOCK_VALUE);
      expect(getPropertyValue({ [MOCK_FQN_PROPERTY]: [MOCK_VALUE] }, MOCK_FQN_PROPERTY)).toEqual(MOCK_VALUE);
      expect(getPropertyValue(fromJS({ [MOCK_FQN_PROPERTY]: [MOCK_VALUE] }), MOCK_FQN_PROPERTY)).toEqual(MOCK_VALUE);
    });

    test('should return the default value when property value is undefined', () => {
      expect(getPropertyValue({}, MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue(Map(), MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue({}, MOCK_FQN_PROPERTY)).toEqual('');
      expect(getPropertyValue(Map(), MOCK_FQN_PROPERTY)).toEqual('');

      expect(getPropertyValue({ [MOCK_STRING_PROPERTY]: [] }, MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue(fromJS({ [MOCK_STRING_PROPERTY]: [] }), MOCK_STRING_PROPERTY)).toEqual('');
      expect(getPropertyValue({ [MOCK_FQN_PROPERTY]: [] }, MOCK_FQN_PROPERTY)).toEqual('');
      expect(getPropertyValue(fromJS({ [MOCK_FQN_PROPERTY]: [] }), MOCK_FQN_PROPERTY)).toEqual('');

      expect(getPropertyValue({}, MOCK_STRING_PROPERTY, 'Default')).toEqual('Default');
      expect(getPropertyValue(Map(), MOCK_STRING_PROPERTY, 'Default')).toEqual('Default');
      expect(getPropertyValue({}, MOCK_FQN_PROPERTY, 'Default')).toEqual('Default');
      expect(getPropertyValue(Map(), MOCK_FQN_PROPERTY, 'Default')).toEqual('Default');
    });

    test('should return the default value when given invalid paramters', () => {
      expect(getPropertyValue(INVALID_PARAMS)).toEqual('');
    });

  });

});
