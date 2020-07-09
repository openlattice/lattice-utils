/*
 * @flow
 */

import isWebCryptoAvailable from './isWebCryptoAvailable';
import type { CryptoKey } from './types';

import Logger from '../Logger';
import { stringToBuffer } from '../binary';
import { isNonEmptyString } from '../lang';

const LOG = new Logger('WebCryptoUtils');

export default function signData(privateKey :CryptoKey, data :string) :Promise<ArrayBuffer> {

  let errorMsg :string = '';

  if (!isWebCryptoAvailable()) {
    errorMsg = 'WebCrypto API not available';
    LOG.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  if (!isNonEmptyString(data)) {
    errorMsg = 'invalid parameter: "data" must be a non-empty string';
    LOG.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
  // TODO: these shouldn't be hardcoded
  return window.crypto.subtle
    .sign(
      { hash: 'SHA-256', name: 'ECDSA' },
      privateKey,
      stringToBuffer(data),
    )
    .then((signature :ArrayBuffer) => signature)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
