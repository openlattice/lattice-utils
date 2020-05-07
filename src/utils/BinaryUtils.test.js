/* eslint-disable no-useless-escape */

import { List } from 'immutable';

import * as BinaryUtils from './BinaryUtils';

import { INVALID_PARAMS } from '../testing/InvalidParams';

const MOCK_BINARY_DATA = [
  {
    value: '',
    base64: '',
    uint8: new Uint8Array(0),
  },
  {
    value: '1234567890!@#$%^&*()',
    base64: 'MTIzNDU2Nzg5MCFAIyQlXiYqKCk=',
    uint8: new Uint8Array([49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41]),
  },
  {
    value: '¡£¢∞§•º≠œ∑¥πåß∂ƒ∆Ω≈ç√∫µ≤≥÷õôãâ',
    base64: 'wqHCo8Ki4oiewqfigKLCuuKJoMWT4oiRwqXPgMOlw5/iiILGkuKIhs6p4omIw6fiiJriiKvCteKJpOKJpcO3w7XDtMOjw6I=',
    uint8: new Uint8Array([
      194, 161, 194, 163, 194, 162, 226, 136, 158, 194, 167, 226, 128, 162, 194, 186,
      226, 137, 160, 197, 147, 226, 136, 145, 194, 165, 207, 128, 195, 165, 195, 159,
      226, 136, 130, 198, 146, 226, 136, 134, 206, 169, 226, 137, 136, 195, 167, 226,
      136, 154, 226, 136, 171, 194, 181, 226, 137, 164, 226, 137, 165, 195, 183, 195,
      181, 195, 180, 195, 163, 195, 162,
    ]),
  },
  {
    value: 'hello',
    base64: 'aGVsbG8=',
    uint8: new Uint8Array([104, 101, 108, 108, 111]),
  },
  {
    value: 'Здравей',
    base64: '0JfQtNGA0LDQstC10Lk=',
    uint8: new Uint8Array([208, 151, 208, 180, 209, 128, 208, 176, 208, 178, 208, 181, 208, 185]),
  },
  {
    value: 'Χαίρετε',
    base64: 'zqfOsc6vz4HOtc+EzrU=',
    uint8: new Uint8Array([206, 167, 206, 177, 206, 175, 207, 129, 206, 181, 207, 132, 206, 181]),
  },
  {
    value: '你好',
    base64: '5L2g5aW9',
    uint8: new Uint8Array([228, 189, 160, 229, 165, 189]),
  },
  {
    value: 'こんにちは',
    base64: '44GT44KT44Gr44Gh44Gv',
    uint8: new Uint8Array([227, 129, 147, 227, 130, 147, 227, 129, 171, 227, 129, 161, 227, 129, 175]),
  },
  {
    value: 'مرحبا',
    base64: '2YXYsdit2KjYpw==',
    uint8: new Uint8Array([217, 133, 216, 177, 216, 173, 216, 168, 216, 167]),
  },
  {
    value: 'नमस्ते',
    base64: '4KSo4KSu4KS44KWN4KSk4KWH',
    uint8: new Uint8Array([224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135]),
  },
  {
    value: 'ဟလို',
    base64: '4YCf4YCc4YCt4YCv',
    uint8: new Uint8Array([225, 128, 159, 225, 128, 156, 225, 128, 173, 225, 128, 175]),
  },
];

describe('BinaryUtils', () => {

  describe('base64ToBuffer', () => {

    test('should correctly convert an ArrayBuffer into a JavaScript string (UTF-16)', () => {
      MOCK_BINARY_DATA.forEach((input) => {
        const result = BinaryUtils.base64ToBuffer(input.base64);
        expect(result).toEqual(input.uint8.buffer);
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
            BinaryUtils.base64ToBuffer(invalidParam);
            errors.push(`expected to throw - base64ToBuffer(${JSON.stringify(invalidParam)})`);
          }
          catch (e) { /* pass */ }
          expect(errors).toEqual([]);
        });
    });
  });

  describe('bufferToBase64', () => {

    test('should correctly convert an ArrayBuffer into a JavaScript string (UTF-16)', () => {
      MOCK_BINARY_DATA.forEach((input) => {
        const result = BinaryUtils.bufferToBase64(input.uint8.buffer);
        expect(result).toEqual(input.base64);
      });
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(() => BinaryUtils.bufferToBase64(invalidParam)).toThrow();
      });
    });
  });

  describe('bufferToString', () => {

    test('should correctly convert an ArrayBuffer into a JavaScript string (UTF-16)', () => {
      MOCK_BINARY_DATA.forEach((input) => {
        const result = BinaryUtils.bufferToString(input.uint8.buffer);
        expect(result).toEqual(input.value);
      });
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(() => BinaryUtils.bufferToString(invalidParam)).toThrow();
      });
    });
  });

  describe('stringToBuffer', () => {

    test('should correctly convert a JavaScript string (UTF-16) to an ArrayBuffer', () => {
      MOCK_BINARY_DATA.forEach((input) => {
        const result = BinaryUtils.stringToBuffer(input.value);
        expect(result).toBeInstanceOf(ArrayBuffer);
        expect(result).toEqual(input.uint8.buffer);
      });
    });

    test('should correctly handle invalid parameters', () => {
      List(INVALID_PARAMS)
        .delete(13) // remove ''
        .delete(13) // remove ' '
        .delete(13) // remove new String()
        .delete(13) // remove 'invalid_special_string_value'
        .forEach((invalidParam) => {
          expect(() => BinaryUtils.stringToBuffer(invalidParam)).toThrow();
        });
    });
  });

});
