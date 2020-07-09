/*
 * @flow
 */

import { List } from 'immutable';

import stringToBuffer from './stringToBuffer';

import { INVALID_PARAMS } from '../../testing/InvalidParams';
import { MOCK_BINARY_DATA } from '../../testing/MockData';

describe('BinaryUtils', () => {

  describe('stringToBuffer', () => {

    test('should correctly convert a string to an ArrayBuffer', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = stringToBuffer(mock.value);
        expect(result).toBeInstanceOf(ArrayBuffer);
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
            stringToBuffer(invalidParam);
            errors.push(`expected to throw - stringToBuffer(${JSON.stringify(invalidParam)})`);
          }
          catch (e) { /* pass */ }
          expect(errors).toEqual([]);
        });
    });

  });

});
