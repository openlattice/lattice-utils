/*
 * @flow
 */

import { fromJS } from 'immutable';
import { Models } from 'lattice';
import { DateTime } from 'luxon';

import getPropertyValues from './getPropertyValues';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const { FQN } = Models;

const MOCK_NAME_VALUE = 'Test';
const MOCK_DATETIME_VALUE = DateTime.local().toISO();
const MOCK_NAME_FQN_PROPERTY = FQN.of('ol.name');
const MOCK_DATETIME_FQN_PROPERTY = FQN.of('ol.datetime');

describe('DataUtils', () => {

  describe('getPropertyValues', () => {

    test('should return the property value when defined', () => {

      expect(getPropertyValues(
        fromJS({ [MOCK_NAME_FQN_PROPERTY]: [MOCK_NAME_VALUE], [MOCK_DATETIME_FQN_PROPERTY]: [MOCK_DATETIME_VALUE] }),
        [MOCK_NAME_FQN_PROPERTY, MOCK_DATETIME_FQN_PROPERTY]
      )).toEqual([MOCK_NAME_VALUE, MOCK_DATETIME_VALUE]);

      expect(getPropertyValues(
        fromJS({ [MOCK_NAME_FQN_PROPERTY]: [MOCK_NAME_VALUE], [MOCK_DATETIME_FQN_PROPERTY]: [MOCK_DATETIME_VALUE] }),
        [MOCK_NAME_FQN_PROPERTY]
      )).toEqual([MOCK_NAME_VALUE]);
    });

    test('should return the default value when property value is undefined', () => {
      expect(getPropertyValues({}, [MOCK_NAME_FQN_PROPERTY])).toEqual(['']);
      expect(getPropertyValues(
        { [MOCK_DATETIME_FQN_PROPERTY]: [MOCK_DATETIME_VALUE] },
        [MOCK_NAME_FQN_PROPERTY]
      )).toEqual(['']);

      expect(getPropertyValues({}, [MOCK_NAME_FQN_PROPERTY], 'Default')).toEqual(['Default']);
      expect(getPropertyValues(
        { [MOCK_DATETIME_FQN_PROPERTY]: [MOCK_DATETIME_VALUE] },
        [MOCK_NAME_FQN_PROPERTY],
        'Default'
      )).toEqual(['Default']);
    });

    test('should return the default value when given invalid paramters', () => {
      expect(getPropertyValues({}, INVALID_PARAMS)).toEqual(INVALID_PARAMS.map(() => ''));
      expect(getPropertyValues({}, INVALID_PARAMS, 'Default')).toEqual(INVALID_PARAMS.map(() => 'Default'));
    });

  });

});
