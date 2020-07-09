/*
 * @flow
 */

import { DateTime } from 'luxon';

import calculateAge from './calculateAge';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('DateTimeUtils', () => {

  describe('calculateAge', () => {

    test('should return a correctly formatted value', () => {
      const mock = jest.spyOn(DateTime, 'local');
      mock.mockImplementationOnce(() => DateTime.fromSQL('2020-01-01'));
      expect(calculateAge('2000-01-01T00:00:00')).toEqual(20);
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(calculateAge(invalidParam)).toEqual(-1);
      });
    });

  });

});
