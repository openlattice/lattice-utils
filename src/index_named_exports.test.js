import { OrderedMap } from 'immutable';

import * as LatticeUtils from './index';

import PACKAGE from '../package.json';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = OrderedMap({
  BinaryUtils     : { size: 4 },
  DateTimeUtils   : { size: 1 },
  LangUtils       : { size: 7 },
  ValidationUtils : { size: 1 },
});
/* eslint-enable key-spacing */

describe('lattice-utils named exports', () => {

  EXPECTED_OBJ_EXPORTS.forEach(({ size }, key) => {
    test(`should export "${key}`, () => {
      expect(Object.prototype.toString.call(LatticeUtils[key])).toEqual('[object Object]');
      expect(Object.keys(LatticeUtils[key])).toHaveLength(size);
    });
  });

  test('should export the correct version', () => {
    expect(LatticeUtils.version).toEqual(PACKAGE.version);
  });

});
