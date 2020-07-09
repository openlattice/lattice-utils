/*
 * @flow
 */

import isArrayBuffer from 'lodash/isArrayBuffer';

import Logger from '../Logger';

const LOG = new Logger('BinaryUtils');

function decodeUTF8(str :string) :string {

  return decodeURIComponent(escape(str));
}

export default function bufferToString(value :ArrayBuffer) :string {

  if (!isArrayBuffer(value)) {
    const errorMsg = 'invalid parameter: "value" must be an ArrayBuffer';
    LOG.error(errorMsg, value);
    throw new Error(errorMsg);
  }

  const binaryString = String.fromCharCode.apply(null, new Uint8Array(value));
  const decodedString = decodeUTF8(binaryString);
  return decodedString;
}
