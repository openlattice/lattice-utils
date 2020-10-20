/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import isFailure from './isFailure';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('isFailure', () => {

    test('return true if request is FAILURE', () => {
      expect(isFailure(FAILURE)).toEqual(true);
    });

    test('return false if request is a RequestState other than FAILURE', () => {
      expect(isFailure(PENDING)).toEqual(false);
      expect(isFailure(STANDBY)).toEqual(false);
      expect(isFailure(SUCCESS)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(isFailure(INVALID_PARAMS)).toEqual(false);
    });

  });
});
