/* eslint-disable no-array-constructor, no-new-object, no-new-wrappers */

import { List } from 'immutable';

import * as LangUtils from './LangUtils';

import { INVALID_PARAMS } from '../testing/InvalidParams';

describe('LangUtils', () => {

  describe('isDefined', () => {

    test('should return true when given valid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(0) // undefined
        .delete(0) // null
        .forEach((validParam) => {
          if (!LangUtils.isDefined(validParam)) {
            errors.push(`expected true - isDefined(${JSON.stringify(validParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });

    test('should return false when given invalid parameters', () => {
      expect(LangUtils.isDefined()).toEqual(false);
      expect(LangUtils.isDefined(null)).toEqual(false);
      expect(LangUtils.isDefined(undefined)).toEqual(false);
    });
  });

  describe('isEmptyArray', () => {

    test('should return true when given valid parameters', () => {
      expect(LangUtils.isEmptyArray([])).toEqual(true);
      expect(LangUtils.isEmptyArray(new Array())).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(2) // remove []
        .delete(2) // remove new Array()
        .forEach((invalidParam) => {
          if (LangUtils.isEmptyArray(invalidParam)) {
            errors.push(`expected false - isEmptyArray(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });
  });

  describe('isEmptyObject', () => {

    test('should return true when given valid parameters', () => {
      expect(LangUtils.isEmptyObject({})).toEqual(true);
      expect(LangUtils.isEmptyObject(new Object())).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(4) // remove {}
        .delete(4) // remove new Object()
        .forEach((invalidParam) => {
          if (LangUtils.isEmptyObject(invalidParam)) {
            errors.push(`expected false - isEmptyObject(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });
  });

  describe('isEmptyString', () => {

    test('should return true when given valid parameters', () => {
      expect(LangUtils.isEmptyString('')).toEqual(true);
      expect(LangUtils.isEmptyString(new String())).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(13) // remove ''
        .delete(13) // remove ' '
        .delete(13) // remove new String()
        .forEach((invalidParam) => {
          if (LangUtils.isEmptyString(invalidParam)) {
            errors.push(`expected false - isEmptyString(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });
  });

  describe('isNonEmptyArray', () => {

    test('should return true when given valid parameters', () => {
      expect(LangUtils.isNonEmptyArray([1, 2, 3])).toEqual(true);
      expect(LangUtils.isNonEmptyArray(new Array(1, 2, 3))).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        if (LangUtils.isNonEmptyArray(invalidParam)) {
          errors.push(`expected false - isNonEmptyArray(${JSON.stringify(invalidParam)})`);
        }
      });
      expect(errors).toEqual([]);
    });
  });

  describe('isNonEmptyObject', () => {

    test('should return true when given valid parameters', () => {
      expect(LangUtils.isNonEmptyObject({ id: 123 })).toEqual(true);
      expect(LangUtils.isNonEmptyObject(new Object({ id: 123 }))).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        if (LangUtils.isNonEmptyObject(invalidParam)) {
          errors.push(`expected false - isNonEmptyObject(${JSON.stringify(invalidParam)})`);
        }
      });
      expect(errors).toEqual([]);
    });
  });

  describe('isNonEmptyString', () => {

    test('should return true when given valid parameters', () => {
      expect(LangUtils.isNonEmptyString('hello')).toEqual(true);
      expect(LangUtils.isNonEmptyString(new String('world'))).toEqual(true);
    });

    test('should return false when given invalid parameters', () => {
      const errors = [];
      List(INVALID_PARAMS)
        .delete(16) // remove 'invalid_special_string_value'
        .forEach((invalidParam) => {
          if (LangUtils.isNonEmptyString(invalidParam)) {
            errors.push(`expected false - isNonEmptyString(${JSON.stringify(invalidParam)})`);
          }
        });
      expect(errors).toEqual([]);
    });
  });

});
