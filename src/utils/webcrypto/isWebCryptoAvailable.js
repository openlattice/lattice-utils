/*
 * @flow
 */

export default function isWebCryptoAvailable() :boolean {

  return (
    Object.prototype.toString.call(window.crypto) === '[object Crypto]'
    && Object.prototype.toString.call(window.crypto.subtle) === '[object SubtleCrypto]'
  );
}
