/*
 * @flow
 */

import bufferToBase64 from './bufferToBase64';

import { INVALID_PARAMS } from '../../testing/InvalidParams';
import { MOCK_BINARY_DATA } from '../../testing/MockData';

describe('BinaryUtils', () => {

  describe('bufferToBase64', () => {

    test('should correctly convert an ArrayBuffer to a Base64-encoded string', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = bufferToBase64(mock.uint8.buffer);
        expect(result).toEqual(mock.base64);
      });
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        const errors = [];
        try {
          bufferToBase64(invalidParam);
          errors.push(`expected to throw - bufferToBase64(${JSON.stringify(invalidParam)})`);
        }
        catch (e) { /* pass */ }
        expect(errors).toEqual([]);
      });
    });

  });

});
