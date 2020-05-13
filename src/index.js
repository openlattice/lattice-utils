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
  DateTimeUtils,
  LangUtils,
  Logger,
  ReduxUtils,
  RoutingUtils,
  ValidationUtils,
  WebCryptoUtils,
} from './utils';

export type { CryptoKey, CryptoKeyPair } from './utils';
export type { GeoError } from './constants';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  BinaryUtils,
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

export default {
  BinaryUtils,
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
