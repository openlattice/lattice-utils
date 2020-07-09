/*
 * @flow
 */

import bufferToString from './bufferToString';

import { INVALID_PARAMS } from '../../testing/InvalidParams';
import { MOCK_BINARY_DATA } from '../../testing/MockData';

describe('BinaryUtils', () => {

  describe('bufferToString', () => {

    test('should correctly convert an ArrayBuffer to a string', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = bufferToString(mock.uint8.buffer);
        expect(result).toEqual(mock.value);
      });
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        const errors = [];
        try {
          bufferToString(invalidParam);
          errors.push(`expected to throw - bufferToString(${JSON.stringify(invalidParam)})`);
        }
        catch (e) { /* pass */ }
        expect(errors).toEqual([]);
      });
    });

  });

});
