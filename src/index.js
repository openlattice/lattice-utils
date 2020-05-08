/*
 * @flow
 */

import useGeo from './hooks/useGeo';
import useInput from './hooks/useInput';
import * as BinaryUtils from './utils/BinaryUtils';
import * as DateTimeUtils from './utils/DateTimeUtils';
import * as LangUtils from './utils/LangUtils';
import * as ValidationUtils from './utils/ValidationUtils';

export type * from './constants';
export type * from './utils/WebCryptoUtils';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  BinaryUtils,
  DateTimeUtils,
  LangUtils,
  ValidationUtils,
  useGeo,
  useInput,
  version,
};

export default {
  BinaryUtils,
  DateTimeUtils,
  LangUtils,
  ValidationUtils,
  useGeo,
  useInput,
  version,
};
