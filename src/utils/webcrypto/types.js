/*
 * @flow
 */

type CryptoKey = {|
  algorithm :Object;
  extractable :boolean;
  type :string;
  usages :string[];
|};

type CryptoKeyPair = {|
  privateKey :CryptoKey;
  publicKey :CryptoKey;
|};

export type {
  CryptoKey,
  CryptoKeyPair,
};
