/*
 * @flow
 */

/* eslint-disable no-new-object */

import { List } from 'immutable';

import isEmptyObject from './isEmptyObject';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isEmptyObject', () => {

    test('should return true when given valid parameters', () => {
      expect(isEmptyObject({})).toEqual(true);
      expect(isEmptyObject(new Object())).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(4) // remove {}
        .delete(4) // remove new Object()
        .forEach((invalidParam) => {
          if (isEmptyObject(invalidParam)) {
            errors.push(`expected false - isEmptyObject(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
