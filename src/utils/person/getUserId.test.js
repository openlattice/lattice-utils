/*
 * @flow
 */

import { fromJS } from 'immutable';

import getUserId from './getUserId';

import { INVALID_PARAMS } from '../../testing/InvalidParams';

const MOCK_USER_ID = 'google-oauth2|012345678909876543210';
const MOCK_PRINCIPAL = fromJS({
  id: MOCK_USER_ID,
  type: 'USER',
});
const MOCK_ORG_MEMBER = fromJS({
  principal: {
    aclKey: ['188293d3-cea5-49f5-a2a5-ad8efb754be2'],
    id: '188293d3-cea5-49f5-a2a5-ad8efb754be2',
    principal: MOCK_PRINCIPAL,
    title: 'MockSecurablePrincipal',
  },
  profile: { user_id: MOCK_USER_ID },
  roles: [],
});
const MOCK_USER = fromJS({
  email: 'mock@openlattice.com',
  nickname: 'MockNickName',
  user_id: MOCK_USER_ID,
  username: 'MockUserName',
});

describe('PersonUtils', () => {

  describe('getUserId', () => {

    test('com.openlattice.organization.OrganizationMember', () => {
      // plain
      expect(getUserId(MOCK_ORG_MEMBER.toJS())).toEqual(MOCK_USER_ID);
      expect(getUserId(MOCK_ORG_MEMBER.delete('profile').toJS())).toEqual(MOCK_USER_ID);
      // immutable
      expect(getUserId(MOCK_ORG_MEMBER)).toEqual(MOCK_USER_ID);
      expect(getUserId(MOCK_ORG_MEMBER.delete('profile'))).toEqual(MOCK_USER_ID);
    });

    test('com.openlattice.authorization.Principal', () => {
      // plain
      expect(getUserId(MOCK_PRINCIPAL.toJS())).toEqual(MOCK_USER_ID);
      // immutable
      expect(getUserId(MOCK_PRINCIPAL)).toEqual(MOCK_USER_ID);
    });

    test('com.auth0.json.mgmt.users.User, com.openlattice.directory.pojo.Auth0UserBasic', () => {
      // plain
      expect(getUserId(MOCK_USER.toJS())).toEqual(MOCK_USER_ID);
      // immutable
      expect(getUserId(MOCK_USER)).toEqual(MOCK_USER_ID);
    });

    test('should return undefined when given invalid parameters', () => {
      const errors = [];
      INVALID_PARAMS.forEach((invalidParam) => {
        const userId = getUserId(invalidParam);
        if (userId !== undefined) {
          errors.push(`expected undefined - getUserId(${JSON.stringify(invalidParam)})`);
        }
      });
      expect(errors).toEqual([]);
    });

  });

});
