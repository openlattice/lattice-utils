/*
 * @flow
 */

import _isArray from 'lodash/isArray';
import { RequestStates } from 'redux-reqseq';
import type { RequestState } from 'redux-reqseq';

/*
 * 1. return undefined if ANY are not RequestStates
 * 2. return RequestState.FAILURE if ANY are FAILURE
 * 3. return RequestState.PENDING if ANY are PENDING
 * 4. return RequestState.SUCCESS if ALL are SUCCESS
 * 5. return RequestState.STANDBY if ALL are STANDBY
 */
export default function reduceRequestStates(requestStates :Array<?RequestState>) :?RequestState {

  if (!_isArray(requestStates) || !requestStates.length) {
    return undefined;
  }

  let anyInvalid = false;
  let anyFailure = false;
  let anyPending = false;
  let successCount = 0;
  let standbyCount = 0;

  requestStates.forEach((requestState) => {
    if (requestState === RequestStates.FAILURE) {
      anyFailure = true;
    }
    else if (requestState === RequestStates.PENDING) {
      anyPending = true;
    }
    else if (requestState === RequestStates.SUCCESS) {
      successCount += 1;
    }
    else if (requestState === RequestStates.STANDBY) {
      standbyCount += 1;
    }
    else {
      anyInvalid = true;
    }
  });

  // 1. return undefined if ANY are not RequestStates
  if (anyInvalid) {
    return undefined;
  }

  // 2. return RequestState.FAILURE if ANY are FAILURE
  if (anyFailure) {
    return RequestStates.FAILURE;
  }

  // 3. return RequestState.PENDING if ANY are PENDING
  if (anyPending) {
    return RequestStates.PENDING;
  }

  // 4. return RequestState.SUCCESS if ALL are SUCCESS
  if (successCount === requestStates.length) {
    return RequestStates.SUCCESS;
  }

  // 5. return RequestState.STANDBY if ALL are STANDBY
  if (standbyCount === requestStates.length) {
    return RequestStates.STANDBY;
  }

  // NOTE: edge case - what should [SUCCESS, STANDBY] reduce to?
  return undefined;
}
