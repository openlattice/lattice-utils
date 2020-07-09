/*
 * @flow
 */

import isArrayBuffer from 'lodash/isArrayBuffer';

import Logger from '../Logger';

const LOG = new Logger('BinaryUtils');

export default function bufferToBase64(value :ArrayBuffer) :string {

  if (!isArrayBuffer(value)) {
    const errorMsg = 'invalid parameter: "value" must be an ArrayBuffer';
    LOG.error(errorMsg, value);
    throw new Error(errorMsg);
  }

  const binaryString = String.fromCharCode.apply(null, new Uint8Array(value));
  return btoa(binaryString);
}
