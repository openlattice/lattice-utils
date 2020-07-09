/* eslint-disable no-useless-escape */

import * as BinaryUtils from '.';
import { MOCK_BINARY_DATA } from '../../testing/MockData';

describe('BinaryUtils', () => {

  describe('inception', () => {

    test('bufferToString(stringToBuffer())', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = BinaryUtils.bufferToString(BinaryUtils.stringToBuffer(mock.value));
        expect(result).toEqual(mock.value);
      });
    });

    test('stringToBuffer(bufferToString())', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = BinaryUtils.stringToBuffer(BinaryUtils.bufferToString(mock.uint8.buffer));
        expect(result).toBeInstanceOf(ArrayBuffer);
        expect(new Uint8Array(result)).toEqual(mock.uint8);
      });
    });

    test('base64ToBuffer(bufferToBase64())', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = BinaryUtils.base64ToBuffer(BinaryUtils.bufferToBase64(mock.uint8.buffer));
        expect(result).toBeInstanceOf(ArrayBuffer);
        expect(new Uint8Array(result)).toEqual(mock.uint8);
      });
    });

    test('bufferToBase64(base64ToBuffer())', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = BinaryUtils.bufferToBase64(BinaryUtils.base64ToBuffer(mock.base64));
        expect(result).toEqual(mock.base64);
      });
    });

    test('bufferToString(base64ToBuffer(bufferToBase64(stringToBuffer())))', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = (
          BinaryUtils.bufferToString(
            BinaryUtils.base64ToBuffer(
              BinaryUtils.bufferToBase64(
                BinaryUtils.stringToBuffer(mock.value)
              )
            )
          )
        );
        expect(result).toEqual(mock.value);
      });
    });

    test('bufferToBase64(stringToBuffer(bufferToString(base64ToBuffer())))', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = (
          BinaryUtils.bufferToBase64(
            BinaryUtils.stringToBuffer(
              BinaryUtils.bufferToString(
                BinaryUtils.base64ToBuffer(mock.base64)
              )
            )
          )
        );
        expect(result).toEqual(mock.base64);
      });
    });

    test('stringToBuffer(bufferToString(base64ToBuffer(bufferToBase64())))', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = (
          BinaryUtils.stringToBuffer(
            BinaryUtils.bufferToString(
              BinaryUtils.base64ToBuffer(
                BinaryUtils.bufferToBase64(mock.uint8.buffer)
              )
            )
          )
        );
        expect(result).toBeInstanceOf(ArrayBuffer);
        expect(new Uint8Array(result)).toEqual(mock.uint8);
      });
    });

    test('base64ToBuffer(bufferToBase64(stringToBuffer(bufferToString())))', () => {
      MOCK_BINARY_DATA.forEach((mock) => {
        const result = (
          BinaryUtils.base64ToBuffer(
            BinaryUtils.bufferToBase64(
              BinaryUtils.stringToBuffer(
                BinaryUtils.bufferToString(mock.uint8.buffer)
              )
            )
          )
        );
        expect(result).toBeInstanceOf(ArrayBuffer);
        expect(new Uint8Array(result)).toEqual(mock.uint8);
      });
    });

  });

});
