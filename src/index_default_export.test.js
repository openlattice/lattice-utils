/* eslint-disable import/no-named-as-default-member */

import _has from 'lodash/has';
import { OrderedMap } from 'immutable';

import LatticeUtils from './index';
import * as Constants from './constants';
import * as Hooks from './hooks';
import * as Utils from './utils';

import PACKAGE from '../package.json';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = OrderedMap({
  BinaryUtils     : { size: 4 },
  DataUtils       : { size: 1 },
  DateTimeUtils   : { size: 4 },
  LangUtils       : { size: 7 },
  PersonUtils     : { size: 1 },
  ReduxUtils      : { size: 9 },
  RoutingUtils    : { size: 1 },
  ValidationUtils : { size: 1 },
  WebCryptoUtils  : { size: 4 },
});
/* eslint-enable key-spacing */

describe('lattice-utils default export', () => {

  EXPECTED_OBJ_EXPORTS.forEach(({ size }, key) => {
    test(`should export "${key}`, () => {
      expect(Object.prototype.toString.call(LatticeUtils[key])).toEqual('[object Object]');
      expect(Object.keys(LatticeUtils[key])).toHaveLength(size);
    });
  });

  test('should export constants', () => {
    const errors = [];
    Object.keys(Constants).forEach((constant) => {
      if (!_has(LatticeUtils, constant)) {
        errors.push(`missing export - ${constant}`);
      }
    });
    expect(errors).toEqual([]);
  });

  test('should export hooks', () => {
    const errors = [];
    Object.keys(Hooks).forEach((hook) => {
      if (!_has(LatticeUtils, hook)) {
        errors.push(`missing export - ${hook}`);
      }
    });
    expect(errors).toEqual([]);
  });

  test('should export utils', () => {
    const errors = [];
    Object.keys(Utils).forEach((util) => {
      if (!_has(LatticeUtils, util)) {
        errors.push(`missing export - ${util}`);
      }
    });
    expect(errors).toEqual([]);
  });

  test('should export the correct version', () => {
    expect(LatticeUtils.version).toEqual(PACKAGE.version);
  });

});
