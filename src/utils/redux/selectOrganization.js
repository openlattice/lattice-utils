/*
 * @flow
 */

import { Map, getIn, hasIn } from 'immutable';
import type { Organization } from 'lattice';

import { ORGANIZATIONS, ORGS } from '../../constants/redux';
import { isValidUUID } from '../validation';
import type { UUID } from '../../types';

export default function selectOrganization(organizationId :?UUID) {

  return (state :Map) :?Organization => {

    if (isValidUUID(organizationId)) {
      if (hasIn(state, [ORGANIZATIONS, ORGS, organizationId])) {
        return getIn(state, [ORGANIZATIONS, ORGS, organizationId]);
      }
    }

    return undefined;
  };
}
