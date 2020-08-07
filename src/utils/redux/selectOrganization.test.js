/*
 * @flow
 */

import { Map } from 'immutable';

import selectOrganization from './selectOrganization';

import { ORGANIZATIONS, ORGS } from '../../constants/redux';
import { INVALID_PARAMS } from '../../testing/InvalidParams';

const MOCK_ORG = {
  id: 'c0e6f6a1-f760-49be-a5ea-021c9a27579d',
  title: 'MockOrgTitle',
};

const MOCK_STORE = Map({
  [ORGANIZATIONS]: Map({
    [ORGS]: Map({
      [MOCK_ORG.id]: MOCK_ORG,
    }),
  }),
});

describe('ReduxUtils', () => {

  describe('selectOrganization', () => {

    test('should return the Organization', () => {
      const org = selectOrganization(MOCK_ORG.id)(MOCK_STORE);
      expect(org).toEqual(MOCK_ORG);
    });

    test('should correctly handle invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        const result1 :any = selectOrganization(invalidParam)(MOCK_STORE);
        if (result1 !== undefined) {
          errors.push(
            `selectOrganization(${JSON.stringify(invalidParam)})(...)`
            + ` - expected undefined, got ${JSON.stringify(result1)}`
          );
        }
        const result2 :any = selectOrganization(MOCK_ORG.id)(invalidParam);
        if (result2 !== undefined) {
          errors.push(
            `selectOrganization(...)([${JSON.stringify(invalidParam)}])`
            + ` - expected undefined, got ${JSON.stringify(result2)}`
          );
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
