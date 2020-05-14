import { DateTime } from 'luxon';

import {
  calculateAge,
  formatAsDate,
  formatAsTime,
  formatDateTime,
} from './DateTimeUtils';

import { INVALID_PARAMS } from '../testing/InvalidParams';

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

  describe('formatDateTime', () => {

    test('should return a correctly formatted value', () => {
      expect(formatDateTime('2017-06-29T12:34:56', DateTime.DATE_SHORT)).toEqual('6/29/2017');
      expect(formatDateTime('2017-06-29T12:34:56', DateTime.TIME_SIMPLE)).toEqual('12:34 PM');
      expect(formatDateTime('2017-06-29T12:34:56', DateTime.DATETIME_SHORT)).toEqual('6/29/2017, 12:34 PM');
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(formatDateTime(invalidParam)).toEqual('---');
        expect(formatDateTime([invalidParam])).toEqual('---');
        expect(formatDateTime(invalidParam, DateTime.DATE_SHORT, '')).toEqual('');
        expect(formatDateTime([invalidParam], DateTime.DATE_SHORT, '')).toEqual('');
      });
    });
  });

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
        expect(formatAsDate(invalidParam)).toEqual('---');
        expect(formatAsDate([invalidParam])).toEqual('---');
        expect(formatAsDate(invalidParam, '')).toEqual('');
        expect(formatAsDate([invalidParam], '')).toEqual('');
      });
    });
  });

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
        expect(formatAsTime(invalidParam)).toEqual('---');
        expect(formatAsTime([invalidParam])).toEqual('---');
        expect(formatAsTime(invalidParam, '')).toEqual('');
        expect(formatAsTime([invalidParam], '')).toEqual('');
      });
    });
  });

});
