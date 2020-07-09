/*
 * @flow
 */

import { List } from 'immutable';

import isDefined from './isDefined';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isDefined', () => {

    test('should return true when given valid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(0) // undefined
        .delete(0) // null
        .forEach((validParam) => {
          if (!isDefined(validParam)) {
            errors.push(`expected true - isDefined(${JSON.stringify(validParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });

    test('should return false when given invalid parameters', () => {
      expect(isDefined()).toEqual(false);
      expect(isDefined(null)).toEqual(false);
      expect(isDefined(undefined)).toEqual(false);
    });

  });

});
