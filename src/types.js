/*
 * @flow
 */

type SagaError = {
 message :string;
 status :number;
 statusText :string;
};

type UUID = string;

export type {
  SagaError,
  UUID,
};
