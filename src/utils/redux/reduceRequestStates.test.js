/*
 * @flow
 */

import { RequestStates } from 'redux-reqseq';

import reduceRequestStates from './reduceRequestStates';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

// https://stackoverflow.com/a/64904542
function permute<T>(list :T[], size :number = list.length) :T[][] {
  if (size > list.length) {
    return [];
  }
  if (size === 1) {
    return list.map((item) => [item]);
  }
  return list.flatMap((item) => (
    permute(list.filter((i) => i !== item), size - 1).map((result) => [item, ...result])
  ));
}

describe('ReduxUtils', () => {

  describe('reduceRequestStates', () => {

    test('return FAILURE if any are FAILURE', () => {
      const errors = [];
      permute([FAILURE, SUCCESS, PENDING, STANDBY]).forEach((i) => {
        const reducedRS = reduceRequestStates(i);
        if (reducedRS !== FAILURE) {
          errors.push(`reduceRequestStates([${JSON.stringify(i)}]) - expected ${FAILURE}, got ${String(reducedRS)}`);
        }
      });
      expect(errors).toEqual([]);
      expect(reduceRequestStates([FAILURE])).toEqual(FAILURE);
    });

    test('return PENDING if any are PENDING and none are FAILURE', () => {
      const errors = [];
      permute([PENDING, SUCCESS, STANDBY]).forEach((i) => {
        const reducedRS = reduceRequestStates(i);
        if (reducedRS !== PENDING) {
          errors.push(`reduceRequestStates([${JSON.stringify(i)}]) - expected ${PENDING}, got ${String(reducedRS)}`);
        }
      });
      expect(errors).toEqual([]);
      expect(reduceRequestStates([PENDING])).toEqual(PENDING);
    });

    test('return SUCCESS if ALL are SUCCESS', () => {
      expect(reduceRequestStates([SUCCESS])).toEqual(SUCCESS);
      expect(reduceRequestStates([SUCCESS, SUCCESS, SUCCESS])).toEqual(SUCCESS);
    });

    test('return STANDBY if ALL are STANDBY', () => {
      expect(reduceRequestStates([STANDBY])).toEqual(STANDBY);
      expect(reduceRequestStates([STANDBY, STANDBY, STANDBY])).toEqual(STANDBY);
    });

    test('should correctly handle invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        let result = reduceRequestStates(invalidParam);
        if (result !== undefined) {
          errors.push(
            `reduceRequestStates(${JSON.stringify(invalidParam)})`
            + ` - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = reduceRequestStates([invalidParam]);
        if (result !== undefined) {
          errors.push(
            `reduceRequestStates([${JSON.stringify(invalidParam)}])`
            + ` - expected undefined, got ${JSON.stringify(result)}`
          );
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
