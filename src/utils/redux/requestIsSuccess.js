/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';
import type { RequestState } from 'redux-reqseq';

export default function requestIsSuccess(requestState :?RequestState) :boolean {
  return requestState === RequestStates.SUCCESS;
}
