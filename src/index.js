/*
 * @flow
 */

import {
  GeoErrors,
  ReduxConstants,
} from './constants';
import {
  useBoolean,
  useError,
  useGeo,
  useGoToRoute,
  useInput,
  useRequestState,
  useStepState,
} from './hooks';
import {
  AxiosUtils,
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

export type { GeoError } from './constants';
export type { RoutingAction } from './hooks';
export type { UUID } from './types';
export type { CryptoKey, CryptoKeyPair } from './utils/webcrypto';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  AxiosUtils,
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
  useError,
  useGeo,
  useGoToRoute,
  useInput,
  useRequestState,
  useStepState,
  version,
};

export default {
  AxiosUtils,
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
  useError,
  useGeo,
  useGoToRoute,
  useInput,
  useRequestState,
  useStepState,
  version,
};
