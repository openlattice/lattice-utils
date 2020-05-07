import * as DateTimeUtils from './DateTimeUtils';

import { INVALID_PARAMS } from '../testing/InvalidParams';

describe('DateTimeUtils', () => {

  describe('formatAsDate', () => {

    test('should return a correctly formatted date', () => {
      const expectedFormat = '6/29/2017';
      expect(DateTimeUtils.formatAsDate('2017-06-29T12:34:56.000-07:00')).toEqual(expectedFormat);
      expect(DateTimeUtils.formatAsDate('2017-06-29T12:34:56.000')).toEqual(expectedFormat);
      expect(DateTimeUtils.formatAsDate('2017-06-29T12:34:56')).toEqual(expectedFormat);
      expect(DateTimeUtils.formatAsDate('2017-06-29')).toEqual(expectedFormat);
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(DateTimeUtils.formatAsDate(invalidParam)).toEqual('---');
        expect(DateTimeUtils.formatAsDate([invalidParam])).toEqual('---');
        expect(DateTimeUtils.formatAsDate(invalidParam, '')).toEqual('');
        expect(DateTimeUtils.formatAsDate([invalidParam], '')).toEqual('');
      });
    });

  });

});
