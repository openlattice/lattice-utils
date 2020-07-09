/*
 * @flow
 */

/* eslint-disable no-new-wrappers */

import { List } from 'immutable';

import isEmptyString from './isEmptyString';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isEmptyString', () => {

    test('should return true when given valid parameters', () => {
      expect(isEmptyString('')).toEqual(true);
      expect(isEmptyString(new String())).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(13) // remove ''
        .delete(13) // remove ' '
        .delete(13) // remove new String()
        .forEach((invalidParam) => {
          if (isEmptyString(invalidParam)) {
            errors.push(`expected false - isEmptyString(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
