/*
 * @flow
 */

import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import { RequestStates } from 'redux-reqseq';
import type { RequestState } from 'redux-reqseq';

const isRequestState = (requestState :RequestState) :boolean => (
  _isString(requestState) && _has(RequestStates, requestState)
);

/*
 * 1. return undefined if ANY are not RequestStates
 * 2. return RequestState.FAILURE if ANY are FAILURE
 * 3. return RequestState.PENDING if ANY are PENDING
 * 4. return RequestState.SUCCESS if ALL are SUCCESS
 * 5. return RequestState.STANDBY if ALL are STANDBY
 */
export default function reduceRequestStates(requestStates :RequestState[]) :?RequestState {

  if (!_isArray(requestStates) || !requestStates.length) {
    return undefined;
  }

  let result :?RequestState;

  requestStates.forEach((requestState, index) => {

    if (index === 0) { // result === undefined
      if (isRequestState(requestState)) {
        result = requestState;
      }
      return;
    }

    if (!isRequestState(requestState) || result === undefined) {
      result = undefined;
      return;
    }

    if (requestState === RequestStates.FAILURE) {
      result = RequestStates.FAILURE;
      return;
    }

    if (requestState === RequestStates.PENDING || result === RequestStates.PENDING) {
      result = RequestStates.PENDING;
      return;
    }

    if (requestState === RequestStates.SUCCESS && result === RequestStates.SUCCESS) {
      result = RequestStates.SUCCESS;
      return;
    }

    result = RequestStates.STANDBY;
  });

  return result;
}
