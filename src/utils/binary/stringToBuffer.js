/*
 * @flow
 */

import isString from 'lodash/isString';

import Logger from '../Logger';

const LOG = new Logger('BinaryUtils');

function encodeUTF8(str :string) :string {

  return unescape(encodeURIComponent(str));
}

export default function stringToBuffer(value :string) :ArrayBuffer {

  if (!isString(value)) {
    const errorMsg = 'invalid parameter: "value" must be a string';
    LOG.error(errorMsg, value);
    throw new Error(errorMsg);
  }

  const encodedString = encodeUTF8(value);
  const byteCount = encodedString.length;

  const buffer = new ArrayBuffer(byteCount);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < byteCount; i += 1) {
    bufferView[i] = encodedString.charCodeAt(i);
  }

  return buffer;
}
