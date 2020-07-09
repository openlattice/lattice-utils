/*
 * @flow
 */

/* eslint-disable no-array-constructor */

import isNonEmptyArray from './isNonEmptyArray';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isNonEmptyArray', () => {

    test('should return true when given valid parameters', () => {
      expect(isNonEmptyArray([1, 2, 3])).toEqual(true);
      // $FlowFixMe - ignore for test
      expect(isNonEmptyArray(new Array(1, 2, 3))).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        if (isNonEmptyArray(invalidParam)) {
          errors.push(`expected false - isNonEmptyArray(${JSON.stringify(invalidParam)})`);
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
