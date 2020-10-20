/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import requestIsSuccess from './requestIsSuccess';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

describe('ReduxUtils', () => {

  describe('requestIsSuccess', () => {

    test('return true if request is SUCCESS', () => {
      expect(requestIsSuccess(SUCCESS)).toEqual(true);
    });

    test('return false if request is a RequestState other than SUCCESS', () => {
      expect(requestIsSuccess(FAILURE)).toEqual(false);
      expect(requestIsSuccess(PENDING)).toEqual(false);
      expect(requestIsSuccess(STANDBY)).toEqual(false);
    });

    test('return false if parameter type is not RequestState', () => {
      expect(requestIsSuccess(INVALID_PARAMS)).toEqual(false);
    });

  });
});
