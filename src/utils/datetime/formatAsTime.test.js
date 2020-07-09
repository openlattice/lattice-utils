/*
 * @flow
 */

import formatAsTime from './formatAsTime';
import { INVALID_DATE_TIME } from './constants';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('DateTimeUtils', () => {

  describe('formatAsTime', () => {

    test('should return a correctly formatted time', () => {
      const expectedFormatPM = '12:34 PM';
      expect(formatAsTime('2017-06-29T12:34:56.000')).toEqual(expectedFormatPM);
      expect(formatAsTime('2017-06-29T12:34:56')).toEqual(expectedFormatPM);
      const expectedFormatAM = '12:34 AM';
      expect(formatAsTime('2017-06-29T00:34:56.000')).toEqual(expectedFormatAM);
      expect(formatAsTime('2017-06-29T00:34:56')).toEqual(expectedFormatAM);
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(formatAsTime(invalidParam)).toEqual(INVALID_DATE_TIME);
        // $FlowFixMe - ignore for test
        expect(formatAsTime([invalidParam])).toEqual(INVALID_DATE_TIME);
        expect(formatAsTime(invalidParam, '')).toEqual('');
        // $FlowFixMe - ignore for test
        expect(formatAsTime([invalidParam], '')).toEqual('');
      });
    });

  });

});
