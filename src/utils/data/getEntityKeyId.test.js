/*
 * @flow
 */

import { fromJS } from 'immutable';

import getEntityKeyId from './getEntityKeyId';
import { OL_ID_FQN } from './constants';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const MOCK_EKID = '02820000-0000-0000-8000-00000000000b';

describe('DataUtils', () => {

  describe('getEntityKeyId', () => {

    test('should return the entity key id when given valid parameters', () => {
      expect(getEntityKeyId({ [OL_ID_FQN]: [MOCK_EKID] })).toEqual(MOCK_EKID);
      expect(getEntityKeyId(fromJS({ [OL_ID_FQN]: [MOCK_EKID] }))).toEqual(MOCK_EKID);
    });

    test('should correctly handle invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        const ipAsString = JSON.stringify(invalidParam);
        let result = getEntityKeyId(invalidParam);
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId(${ipAsString}) - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId([invalidParam]);
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId([${ipAsString}]) - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId({ [invalidParam]: 'test' });
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId({ ${ipAsString}: 'test' }) - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId({ [OL_ID_FQN]: invalidParam });
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId({ ${OL_ID_FQN}: ${ipAsString} }) - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId({ [OL_ID_FQN]: [invalidParam] });
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId({ ${OL_ID_FQN}: [${ipAsString}] }) - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId(fromJS({ [invalidParam]: 'test' }));
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId(fromJS({ ${ipAsString}: 'test' }))`
            + ` - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId(fromJS({ [OL_ID_FQN]: invalidParam }));
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId(fromJS({ ${OL_ID_FQN}: ${ipAsString} }))`
            + ` - expected undefined, got ${JSON.stringify(result)}`
          );
        }
        result = getEntityKeyId(fromJS({ [OL_ID_FQN]: [invalidParam] }));
        if (result !== undefined) {
          errors.push(
            `getEntityKeyId(fromJS({ ${OL_ID_FQN}: [${ipAsString}] }))`
            + ` - expected undefined, got ${JSON.stringify(result)}`
          );
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
