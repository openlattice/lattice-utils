/*
 * @flow
 */

import { get, getIn } from 'immutable';

import { isDefined, isNonEmptyString } from '../lang';

export default function getUserId(user :any) :?string {

  if (!isDefined(user)) {
    return undefined;
  }

  let userId :?string;
  let principalType :?string;

  // com.openlattice.organization.OrganizationMember
  userId = getIn(user, ['profile', 'user_id']);
  if (isNonEmptyString(userId)) {
    return userId;
  }

  // com.openlattice.organization.OrganizationMember
  userId = getIn(user, ['principal', 'principal', 'id']);
  principalType = getIn(user, ['principal', 'principal', 'type']);
  if (isNonEmptyString(userId) && principalType === 'USER') {
    return userId;
  }

  // com.openlattice.authorization.Principal
  userId = get(user, 'id');
  principalType = get(user, 'type');
  if (isNonEmptyString(userId) && principalType === 'USER') {
    return userId;
  }

  // com.auth0.json.mgmt.users.User
  // com.openlattice.directory.pojo.Auth0UserBasic
  userId = get(user, 'user_id');
  if (isNonEmptyString(userId)) {
    return userId;
  }

  return undefined;
}
