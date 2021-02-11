/*
 * @flow
 */
import type { $AxiosError } from 'axios';

import type { SagaError } from '../../../types';

const MOCK_AXIOS_401_ERROR = (() :$AxiosError<*> => {
  const err:any = new Error('Test');
  err.config = {};
  err.code = {};
  err.request = {};
  err.response = {
    data: {
      errors: [{
        error: {},
        message: 'Object is not accessible.'
      }]
    },
    status: 401,
    statusText: 'Unauthorized'
  };
  err.isAxiosError = true;
  return err;
})();

const MOCK_NOT_AXIOS_ERROR = (() :Error => {
  const err :any = new Error('Test');
  err.config = {};
  err.code = {};
  err.request = {};
  err.response = {
    data: {},
    status: 401,
  };
  return err;
})();

const MOCK_NO_RESPONSE_ERROR = (() :Error => {
  const err:any = new Error('Test');
  err.config = {};
  err.code = {};
  err.request = {};
  err.response = {
    data: {},
    status: 401,
  };
  return err;
})();

const MOCK_SAGA_ERROR :SagaError = {
  message: 'Object is not accessible.',
  status: 401,
  statusText: 'Unauthorized'
};

export {
  MOCK_AXIOS_401_ERROR,
  MOCK_NOT_AXIOS_ERROR,
  MOCK_NO_RESPONSE_ERROR,
  MOCK_SAGA_ERROR
};
