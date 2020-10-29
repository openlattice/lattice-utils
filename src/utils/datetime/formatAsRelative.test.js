/*
 * @flow
 */

import { DateTime } from 'luxon';

import formatAsRelative from './formatAsRelative';
import { INVALID_DATE_TIME, RELATIVE_TIMES } from './constants';
import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('DateTimeUtils', () => {

  describe('formatAsDate', () => {
    const expectedShortDate = '7/31/2018';
    const expectedLongDate = '7/31/2018, 10:09 AM';
    const today = DateTime.local();
    const yesterday = today.minus({ days: 1 }).toISO();
    const threeDaysAgo = today.minus({ days: 3 }).toISO();
    const expectedThreeDaysAgoLabel = '3 days ago';
    const threeWeeksAgo = today.minus({ weeks: 3 }).toISO();
    const expectedThreeWeeksAgoLabel = '3 weeks ago';
    const threeMonthsAgo = today.minus({ months: 3 }).toISO();
    const expectedThreeMonthsAgoLabel = '3 months ago';

    test('should return Today and Yesterday Labels for today and yesterday', () => {
      expect(formatAsRelative(today.toISO())).toEqual(RELATIVE_TIMES.TODAY);
      expect(formatAsRelative(yesterday)).toEqual(RELATIVE_TIMES.YESTERDAY);
    });
    test('should return units of days if at least two days ago and less than one week ago', () => {
      expect(formatAsRelative(threeDaysAgo)).toEqual(expectedThreeDaysAgoLabel);
    });
    test('should return units of weeks if at least one week ago and less than one month ago', () => {
      expect(formatAsRelative(threeWeeksAgo)).toEqual(expectedThreeWeeksAgoLabel);
    });
    test('should return units of months if at least one month ago and less than one year ago', () => {
      expect(formatAsRelative(threeMonthsAgo)).toEqual(expectedThreeMonthsAgoLabel);
    });

    test('should return actual date in default DATE_SHORT format if over a year ago', () => {
      expect(formatAsRelative('2018-07-31T16:09:17.081748Z')).toEqual(expectedShortDate);
    });
    test('should return actual date in specified format if over a year ago', () => {
      expect(formatAsRelative('2018-07-31T16:09:17.081748Z', DateTime.DATETIME_SHORT)).toEqual(expectedLongDate);
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(formatAsRelative(invalidParam)).toEqual(INVALID_DATE_TIME);
        // $FlowFixMe - ignore for test
        expect(formatAsRelative([invalidParam])).toEqual(INVALID_DATE_TIME);
        expect(formatAsRelative(invalidParam, DateTime.DATE_SHORT, '')).toEqual('');
        // $FlowFixMe - ignore for test
        expect(formatAsRelative([invalidParam], DateTime.DATE_SHORT, '')).toEqual('');
      });
    });

  });

});
