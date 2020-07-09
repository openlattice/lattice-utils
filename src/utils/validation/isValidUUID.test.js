/*
 * @flow
 */

import isValidUUID from './isValidUUID';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('ValidationUtils', () => {

  describe('isValidUUID', () => {

    test('should return true when given valid parameters', () => {
      expect(isValidUUID('02820000-0000-0000-8000-00000000000b')).toEqual(true);
      expect(isValidUUID('4bd267a0-8601-45bb-8041-bcf2d5ffbe44')).toEqual(true);
      expect(isValidUUID('7fffffff-ffff-ffff-7fff-ffffffffffff')).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        if (isValidUUID(invalidParam)) {
          errors.push(`expected false - isValidUUID(${JSON.stringify(invalidParam)})`);
        }
        if (isValidUUID([invalidParam])) {
          errors.push(`expected false - isValidUUID([${JSON.stringify(invalidParam)}])`);
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
