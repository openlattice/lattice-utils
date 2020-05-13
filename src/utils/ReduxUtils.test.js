import { RequestStates } from 'redux-reqseq';

import * as ReduxUtils from './ReduxUtils';

import { INVALID_PARAMS } from '../testing/InvalidParams';

const {
  STANDBY,
  PENDING,
  SUCCESS,
  FAILURE,
} = RequestStates;

const { reduceRequestStates } = ReduxUtils;

describe('ReduxUtils', () => {

  describe('reduceRequestStates', () => {

    test('return FAILURE if any are FAILURE', () => {
      expect(reduceRequestStates([FAILURE])).toEqual(FAILURE);
      expect(reduceRequestStates([STANDBY, PENDING, SUCCESS, FAILURE])).toEqual(FAILURE);
    });

    test('return PENDING if any are PENDING and none are FAILURE', () => {
      expect(reduceRequestStates([PENDING])).toEqual(PENDING);
      expect(reduceRequestStates([STANDBY, SUCCESS, PENDING, SUCCESS])).toEqual(PENDING);
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
            `reduceRequestStates(${JSON.stringify(invalidParam)}) - `
            + `expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = reduceRequestStates([invalidParam]);
        if (result !== undefined) {
          errors.push(
            `reduceRequestStates([${JSON.stringify(invalidParam)}]) - `
            + `expected undefined, got ${JSON.stringify(result)}`
          );
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
