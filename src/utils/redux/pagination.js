/*
 * @flow
 */

import { FILTER, PAGE, RESET } from '../../constants/redux';

type State = {|
  page :number;
  query :string;
  start :number;
|};

type Action = {|
  page ?:number;
  query ?:string;
  start ?:number;
  type :typeof FILTER | typeof PAGE | typeof RESET;
|};

const INITIAL_STATE :State = {
  page: 1,
  query: '',
  start: 0,
};

const reducer = (state :State, action :Action) => {
  switch (action.type) {
    case FILTER: {
      return {
        ...state,
        query: action.query || INITIAL_STATE.query,
      };
    }
    case PAGE: {
      return {
        ...state,
        page: action.page || INITIAL_STATE.page,
        start: action.start || INITIAL_STATE.start,
      };
    }
    case RESET: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export {
  INITIAL_STATE,
  reducer,
};
