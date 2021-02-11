/*
 * @flow
 */

import { getIn } from 'immutable';
import { useSelector } from 'react-redux';

import { ERROR } from '../constants/redux';

const useError = (path :string[]) :?Object => {

  const error = useSelector((s) => getIn(s, [...path, ERROR]));
  if (error) {
    return error;
  }

  return undefined;
};

export default useError;
