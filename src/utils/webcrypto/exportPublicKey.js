/*
 * @flow
 */

import isWebCryptoAvailable from './isWebCryptoAvailable';
import type { CryptoKey } from './types';

import Logger from '../Logger';

const LOG = new Logger('WebCryptoUtils');

export default function exportPublicKey(publicKey :CryptoKey) :Promise<ArrayBuffer> {

  let errorMsg :string = '';

  if (!isWebCryptoAvailable()) {
    errorMsg = 'WebCrypto API not available';
    LOG.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  if (!publicKey) {
    errorMsg = 'invalid parameter: "publicKey" must be a valid CryptoKey';
    LOG.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
  return window.crypto.subtle
    .exportKey(
      'raw', // TODO: should this be 'raw' or 'spki'?
      publicKey,
    )
    .then((exportedKey :ArrayBuffer) => exportedKey)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
