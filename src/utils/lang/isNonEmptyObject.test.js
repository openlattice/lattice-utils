/*
 * @flow
 */

/* eslint-disable no-new-object */

import isNonEmptyObject from './isNonEmptyObject';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isNonEmptyObject', () => {

    test('should return true when given valid parameters', () => {
      expect(isNonEmptyObject({ id: 123 })).toEqual(true);
      // $FlowFixMe - ignore for test
      expect(isNonEmptyObject(new Object({ id: 123 }))).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        if (isNonEmptyObject(invalidParam)) {
          errors.push(`expected false - isNonEmptyObject(${JSON.stringify(invalidParam)})`);
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
