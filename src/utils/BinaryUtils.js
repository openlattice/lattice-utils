/*
 * @flow
 */

import isArrayBuffer from 'lodash/isArrayBuffer';
import isString from 'lodash/isString';

function encodeUTF8(str :string) :string {

  return unescape(encodeURIComponent(str));
}

function decodeUTF8(str :string) :string {

  return decodeURIComponent(escape(str));
}

function bufferToString(value :ArrayBuffer) :string {

  if (!isArrayBuffer(value)) {
    throw new Error('invalid parameter: "value" must be an ArrayBuffer');
  }

  const binaryString = String.fromCharCode.apply(null, new Uint8Array(value));
  const decodedString = decodeUTF8(binaryString);
  return decodedString;
}

function stringToBuffer(value :string) :ArrayBuffer {

  if (!isString(value)) {
    throw new Error('invalid parameter: "value" must be a string');
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

function bufferToBase64(value :ArrayBuffer) :string {

  if (!isArrayBuffer(value)) {
    throw new Error('invalid parameter: "value" must be an ArrayBuffer');
  }

  const binaryString = String.fromCharCode.apply(null, new Uint8Array(value));
  return btoa(binaryString);
}

function base64ToBuffer(value :string) :ArrayBuffer {

  if (!isString(value)) {
    throw new Error('invalid parameter: "value" must be a string');
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

export {
  base64ToBuffer,
  bufferToBase64,
  bufferToString,
  stringToBuffer,
};
