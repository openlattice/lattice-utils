/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import requestIsPending from './requestIsPending';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('requestIsPending', () => {

    test('return true if request is PENDING', () => {
      expect(requestIsPending(PENDING)).toEqual(true);
    });

    test('return false if request is a RequestState other than PENDING', () => {
      expect(requestIsPending(FAILURE)).toEqual(false);
      expect(requestIsPending(STANDBY)).toEqual(false);
      expect(requestIsPending(SUCCESS)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(requestIsPending(INVALID_PARAMS)).toEqual(false);
    });

  });
});
