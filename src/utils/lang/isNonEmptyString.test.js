/*
 * @flow
 */

/* eslint-disable no-new-wrappers */

import { List } from 'immutable';

import isNonEmptyString from './isNonEmptyString';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isNonEmptyString', () => {

    test('should return true when given valid parameters', () => {
      expect(isNonEmptyString('hello')).toEqual(true);
      expect(isNonEmptyString(new String('world'))).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(16) // remove 'invalid_special_string_value'
        .forEach((invalidParam) => {
          if (isNonEmptyString(invalidParam)) {
            errors.push(`expected false - isNonEmptyString(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
