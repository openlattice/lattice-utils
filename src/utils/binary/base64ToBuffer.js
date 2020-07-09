/*
 * @flow
 */

import isString from 'lodash/isString';

import Logger from '../Logger';

const LOG = new Logger('BinaryUtils');

export default function base64ToBuffer(value :string) :ArrayBuffer {

  if (!isString(value)) {
    const errorMsg = 'invalid parameter: "value" must be a string';
    LOG.error(errorMsg, value);
    throw new Error(errorMsg);
  }

  const binaryString = atob(value);
  const byteCount = binaryString.length;

  const buffer = new ArrayBuffer(byteCount);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < byteCount; i += 1) {
    bufferView[i] = binaryString.charCodeAt(i);
  }

  return buffer;
}
