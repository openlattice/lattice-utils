/*
 * @flow
 */

import { DateTime } from 'luxon';

import getPropertyValues from './getPropertyValues';

const MOCK_NAME_VALUE = 'Test';
const MOCK_DATETIME_VALUE = DateTime.local().toISO();
const MOCK_NAME_PROPERTY = 'ol.name';
const MOCK_DATETIME_PROPERTY = 'ol.datetime';

const MOCK_ENTITY_OBJ = {
  [MOCK_DATETIME_PROPERTY]: MOCK_DATETIME_VALUE,
  [MOCK_NAME_PROPERTY]: MOCK_NAME_VALUE,
};

describe('DataUtils', () => {

  describe('getPropertyValues', () => {

    test('should return an object of with key/value pairs of fqn/value for each fqn provided', () => {
      expect(getPropertyValues(MOCK_ENTITY_OBJ, [MOCK_NAME_PROPERTY, MOCK_DATETIME_PROPERTY])).toEqual(MOCK_ENTITY_OBJ);
    });

    test('should return an object with the default value for every undefined property', () => {
      expect(getPropertyValues({}, [MOCK_NAME_PROPERTY])).toEqual({ [MOCK_NAME_PROPERTY]: '' });
      expect(getPropertyValues({}, [MOCK_NAME_PROPERTY], 'Default')).toEqual({ [MOCK_NAME_PROPERTY]: 'Default' });
      expect(getPropertyValues(
        { [MOCK_DATETIME_PROPERTY]: [MOCK_DATETIME_VALUE] },
        [MOCK_NAME_PROPERTY]
      )).toEqual({ [MOCK_NAME_PROPERTY]: '' });
      expect(getPropertyValues(
        { [MOCK_DATETIME_PROPERTY]: [MOCK_DATETIME_VALUE] },
        [MOCK_NAME_PROPERTY],
        'Default'
      )).toEqual({ [MOCK_NAME_PROPERTY]: 'Default' });
    });
  });

});
