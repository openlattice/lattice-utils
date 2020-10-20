/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import isStandby from './isStandby';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('isStandby', () => {

    test('return true if request is STANDBY', () => {
      expect(isStandby(STANDBY)).toEqual(true);
    });

    test('return false if request is a RequestState other than STANDBY', () => {
      expect(isStandby(FAILURE)).toEqual(false);
      expect(isStandby(PENDING)).toEqual(false);
      expect(isStandby(SUCCESS)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(isStandby(INVALID_PARAMS)).toEqual(false);
    });

  });
});
