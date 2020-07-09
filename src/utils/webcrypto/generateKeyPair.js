/*
 * @flow
 */

import isWebCryptoAvailable from './isWebCryptoAvailable';
import type { CryptoKeyPair } from './types';

import Logger from '../Logger';

const LOG = new Logger('WebCryptoUtils');

export default function generateKeyPair() :Promise<CryptoKeyPair> {

  let errorMsg :string = '';

  if (!isWebCryptoAvailable()) {
    errorMsg = 'WebCrypto API not available';
    LOG.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
  return window.crypto.subtle
    .generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' }, // TODO: these shouldn't be hardcoded
      true,
      ['sign', 'verify'], // TODO: these shouldn't be hardcoded
    )
    .then((cryptoKeyPair :CryptoKeyPair) => cryptoKeyPair)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
