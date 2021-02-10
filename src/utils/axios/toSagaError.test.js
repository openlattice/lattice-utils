/*
 * @flow
 */
import toSagaError from './toSagaError';

import {
  MOCK_AXIOS_401_ERROR,
  MOCK_NOT_AXIOS_ERROR,
  MOCK_NO_RESPONSE_ERROR,
  MOCK_SAGA_ERROR
} from './mocks';

describe('AxiosUtils', () => {

  describe('toSagaError', () => {

    test('should correctly handle non AxiosErrors', () => {
      expect(toSagaError(MOCK_NOT_AXIOS_ERROR)).toEqual({});
    });

    test('should correctly handle errors with no response', () => {
      expect(toSagaError(MOCK_NO_RESPONSE_ERROR)).toEqual({});
    });

    test('should correctly handle AxiosError', () => {
      expect(toSagaError(MOCK_AXIOS_401_ERROR)).toEqual(MOCK_SAGA_ERROR);
    });

  });

});
