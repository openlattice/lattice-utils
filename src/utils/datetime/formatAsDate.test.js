/*
 * @flow
 */

import formatAsDate from './formatAsDate';
import { INVALID_DATE_TIME } from './constants';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('DateTimeUtils', () => {

  describe('formatAsDate', () => {

    test('should return a correctly formatted date', () => {
      const expectedFormat = '6/29/2017';
      expect(formatAsDate('2017-06-29T12:34:56.000-07:00')).toEqual(expectedFormat);
      expect(formatAsDate('2017-06-29T12:34:56.000')).toEqual(expectedFormat);
      expect(formatAsDate('2017-06-29T12:34:56')).toEqual(expectedFormat);
      expect(formatAsDate('2017-06-29')).toEqual(expectedFormat);
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(formatAsDate(invalidParam)).toEqual(INVALID_DATE_TIME);
        // $FlowFixMe - ignore for test
        expect(formatAsDate([invalidParam])).toEqual(INVALID_DATE_TIME);
        expect(formatAsDate(invalidParam, '')).toEqual('');
        // $FlowFixMe - ignore for test
        expect(formatAsDate([invalidParam], '')).toEqual('');
      });
    });

  });

});
