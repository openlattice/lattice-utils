/*
 * @flow
 */

import getParamFromMatch from './getParamFromMatch';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const MOCK_MATCH = {
  params: {
    id: 'id',
    test: 'test',
  },
};

describe('RoutingUtils', () => {

  describe('getParamFromMatch', () => {

    test('should return the correct param', () => {
      expect(getParamFromMatch(MOCK_MATCH, 'id')).toEqual('id');
      expect(getParamFromMatch(MOCK_MATCH, ':test')).toEqual('test');
    });

    test('should return null when param is not available', () => {
      expect(getParamFromMatch(MOCK_MATCH, 'nope')).toBeNull();
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(getParamFromMatch(invalidParam, 'id')).toBeNull();
        expect(getParamFromMatch({ params: invalidParam }, 'id')).toBeNull();
        expect(getParamFromMatch(MOCK_MATCH, invalidParam)).toBeNull();
      });
    });

  });

});
