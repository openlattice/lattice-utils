import * as RoutingUtils from './RoutingUtils';

import { INVALID_PARAMS } from '../testing/InvalidParams';

const MOCK_MATCH = {
  params: {
    id: 'id',
    test: 'test',
  },
};

describe('RoutingUtils', () => {

  describe('getParamFromMatch', () => {

    test('should return the correct param', () => {
      expect(RoutingUtils.getParamFromMatch(MOCK_MATCH, 'id')).toEqual('id');
      expect(RoutingUtils.getParamFromMatch(MOCK_MATCH, ':test')).toEqual('test');
    });

    test('should return null when param is not available', () => {
      expect(RoutingUtils.getParamFromMatch(MOCK_MATCH, 'nope')).toBeNull();
    });

    test('should correctly handle invalid parameters', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(RoutingUtils.getParamFromMatch(invalidParam, 'id')).toBeNull();
        expect(RoutingUtils.getParamFromMatch({ params: invalidParam }, 'id')).toBeNull();
        expect(RoutingUtils.getParamFromMatch(MOCK_MATCH, invalidParam)).toBeNull();
      });
    });

  });

});
