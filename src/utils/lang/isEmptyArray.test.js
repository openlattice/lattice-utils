/*
 * @flow
 */

/* eslint-disable no-array-constructor */

import { List } from 'immutable';

import isEmptyArray from './isEmptyArray';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isEmptyArray', () => {

    test('should return true when given valid parameters', () => {
      expect(isEmptyArray([])).toEqual(true);
      // $FlowFixMe - ignore for test
      expect(isEmptyArray(new Array())).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(2) // remove []
        .delete(2) // remove new Array()
        .forEach((invalidParam) => {
          if (isEmptyArray(invalidParam)) {
            errors.push(`expected false - isEmptyArray(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });

  });

});
