/*
 * @flow
 */

import { DateTime } from 'luxon';

import formatDateTime from './formatDateTime';
import { INVALID_DATE_TIME } from './constants';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('DateTimeUtils', () => {

  describe('formatDateTime', () => {

    test('should return a correctly formatted value', () => {
      expect(formatDateTime('2017-06-29T12:34:56', DateTime.DATE_SHORT)).toEqual('6/29/2017');
      expect(formatDateTime('2017-06-29T12:34:56', DateTime.TIME_SIMPLE)).toEqual('12:34 PM');
      expect(formatDateTime('2017-06-29T12:34:56', DateTime.DATETIME_SHORT)).toEqual('6/29/2017, 12:34 PM');
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        // $FlowFixMe
        expect(formatDateTime(invalidParam)).toEqual(INVALID_DATE_TIME);
        // $FlowFixMe
        expect(formatDateTime([invalidParam])).toEqual(INVALID_DATE_TIME);
        expect(formatDateTime(invalidParam, DateTime.DATE_SHORT, '')).toEqual('');
        // $FlowFixMe
        expect(formatDateTime([invalidParam], DateTime.DATE_SHORT, '')).toEqual('');
      });
    });

  });

});
