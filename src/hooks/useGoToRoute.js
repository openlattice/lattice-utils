/*
 * @flow
 */

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

declare type RoutingAction = {
  +route :string;
  +type :string;
  state :Object;
};

const GO_TO_ROUTE :'GO_TO_ROUTE' = 'GO_TO_ROUTE';
function goToRoute(route :string, state ?:Object = {}) :RoutingAction {
  return {
    route,
    state,
    type: GO_TO_ROUTE,
  };
}

const useGoToRoute = (route :string, state :any) => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(goToRoute(route, state)), [dispatch, state, route]);
};

export default useGoToRoute;
