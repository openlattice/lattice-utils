/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import requestIsStandby from './requestIsStandby';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('requestIsStandby', () => {

    test('return true if request is STANDBY', () => {
      expect(requestIsStandby(STANDBY)).toEqual(true);
    });

    test('return false if request is a RequestState other than STANDBY', () => {
      expect(requestIsStandby(FAILURE)).toEqual(false);
      expect(requestIsStandby(PENDING)).toEqual(false);
      expect(requestIsStandby(SUCCESS)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(requestIsStandby(INVALID_PARAMS)).toEqual(false);
    });

  });
});
