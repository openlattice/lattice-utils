/*
 * @flow
 */

import { List } from 'immutable';

import base64ToBuffer from './base64ToBuffer';

import { INVALID_PARAMS } from '../../testing/InvalidParams';
import { MOCK_BINARY_DATA } from '../../testing/MockData';

describe('BinaryUtils', () => {

  describe('base64ToBuffer', () => {

    test('should correctly convert a Base64-encoded string to an ArrayBuffer', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = base64ToBuffer(mock.base64);
        expect(result).toEqual(mock.uint8.buffer);
      });
    });

    test('should correctly handle invalid parameters', () => {
      List(INVALID_PARAMS)
        .delete(13) // remove ''
        .delete(13) // remove ' '
        .delete(13) // remove new String()
        .delete(13) // remove 'invalid_special_string_value'
        .forEach((invalidParam) => {
          const errors = [];
          try {
            base64ToBuffer(invalidParam);
            errors.push(`expected to throw - base64ToBuffer(${JSON.stringify(invalidParam)})`);
          }
          catch (e) { /* pass */ }
          expect(errors).toEqual([]);
        });
    });

  });

});
