/*
 * @flow
 */

import {
  GeoErrors,
  ReduxConstants,
} from './constants';
import {
  useBoolean,
  useGeo,
  useGoToRoute,
  useInput,
  useRequestState,
} from './hooks';
import {
  BinaryUtils,
  DataUtils,
  DateTimeUtils,
  LangUtils,
  Logger,
  PersonUtils,
  ReduxUtils,
  RoutingUtils,
  ValidationUtils,
  WebCryptoUtils,
} from './utils';

export type { RoutingAction } from './hooks';
export type { UUID } from './utils/data';
export type { CryptoKey, CryptoKeyPair } from './utils/webcrypto';
export type { GeoError } from './constants';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  BinaryUtils,
  DataUtils,
  DateTimeUtils,
  GeoErrors,
  LangUtils,
  Logger,
  PersonUtils,
  ReduxConstants,
  ReduxUtils,
  RoutingUtils,
  ValidationUtils,
  WebCryptoUtils,
  useBoolean,
  useGeo,
  useGoToRoute,
  useInput,
  useRequestState,
  version,
};

export default {
  BinaryUtils,
  DataUtils,
  DateTimeUtils,
  GeoErrors,
  LangUtils,
  Logger,
  ReduxConstants,
  ReduxUtils,
  RoutingUtils,
  ValidationUtils,
  WebCryptoUtils,
  useBoolean,
  useGeo,
  useGoToRoute,
  useInput,
  useRequestState,
  version,
};
