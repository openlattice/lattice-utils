/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import requestIsFailure from './requestIsFailure';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('requestIsFailure', () => {

    test('return true if request is FAILURE', () => {
      expect(requestIsFailure(FAILURE)).toEqual(true);
    });

    test('return false if request is a RequestState other than FAILURE', () => {
      expect(requestIsFailure(PENDING)).toEqual(false);
      expect(requestIsFailure(STANDBY)).toEqual(false);
      expect(requestIsFailure(SUCCESS)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(requestIsFailure(INVALID_PARAMS)).toEqual(false);
    });

  });
});
