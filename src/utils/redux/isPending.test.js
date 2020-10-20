/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import isPending from './isPending';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('isPending', () => {

    test('return true if request is PENDING', () => {
      expect(isPending(PENDING)).toEqual(true);
    });

    test('return false if request is a RequestState other than PENDING', () => {
      expect(isPending(FAILURE)).toEqual(false);
      expect(isPending(STANDBY)).toEqual(false);
      expect(isPending(SUCCESS)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(isPending(INVALID_PARAMS)).toEqual(false);
    });

  });
});
