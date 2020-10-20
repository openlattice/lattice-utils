/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import isSuccess from './isSuccess';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('isSuccess', () => {

    test('return true if request is SUCCESS', () => {
      expect(isSuccess(SUCCESS)).toEqual(true);
    });

    test('return false if request is a RequestState other than SUCCESS', () => {
      expect(isSuccess(FAILURE)).toEqual(false);
      expect(isSuccess(PENDING)).toEqual(false);
      expect(isSuccess(STANDBY)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(isSuccess(INVALID_PARAMS)).toEqual(false);
    });

  });
});
