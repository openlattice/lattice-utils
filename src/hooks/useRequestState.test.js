/*
 * @flow
 */

import React from 'react';

import { mount } from 'enzyme';
import { RequestStates } from 'redux-reqseq';

import useRequestState from './useRequestState';

import { REQUEST_STATE } from '../constants/ReduxConstants';
import { INVALID_PARAMS } from '../testing/InvalidParams';

let mockUseSelector :JestMockFn<any[], any>;
jest.mock('react-redux', () => {
  mockUseSelector = jest.fn();
  return { useSelector: mockUseSelector };
});

const MOCK_ACTION = 'MOCK_ACTION';
const MOCK_REDUCER = 'MOCK_REDUCER';

type Props = {
  path :string[];
};

const Component = ({ path } :Props) => {
  const requestState = useRequestState(path);
  return (
    <div>
      {/* $FlowFixMe */}
      <span>{`${requestState}`}</span>
    </div>
  );
};

describe('useRequestState', () => {

  afterEach(() => {
    mockUseSelector.mockClear();
  });

  test(`should return ${RequestStates.STANDBY}`, () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({
      [MOCK_REDUCER]: {
        [MOCK_ACTION]: {
          [REQUEST_STATE]: RequestStates.STANDBY,
        },
      },
    }));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('span').text()).toEqual(RequestStates.STANDBY);
  });

  test(`should return ${RequestStates.PENDING}`, () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({
      [MOCK_REDUCER]: {
        [MOCK_ACTION]: {
          [REQUEST_STATE]: RequestStates.PENDING,
        },
      },
    }));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('span').text()).toEqual(RequestStates.PENDING);
  });

  test(`should return ${RequestStates.SUCCESS}`, () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({
      [MOCK_REDUCER]: {
        [MOCK_ACTION]: {
          [REQUEST_STATE]: RequestStates.SUCCESS,
        },
      },
    }));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('span').text()).toEqual(RequestStates.SUCCESS);
  });

  test(`should return ${RequestStates.FAILURE}`, () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({
      [MOCK_REDUCER]: {
        [MOCK_ACTION]: {
          [REQUEST_STATE]: RequestStates.FAILURE,
        },
      },
    }));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('span').text()).toEqual(RequestStates.FAILURE);
  });

  test('should return undefined if not in state', () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({}));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('span').text()).toEqual('undefined');
  });

  test('should correctly handle invalid parameters', () => {
    const errors = [];
    INVALID_PARAMS.forEach((invalidParam) => {
      const wrapper = mount(<Component path={invalidParam} />);
      const text = wrapper.find('span').text();
      if (text !== 'undefined') {
        errors.push(`expected "undefined" - useRequestState(${JSON.stringify(invalidParam)})`);
      }
    });
    INVALID_PARAMS.forEach((invalidParam) => {
      const wrapper = mount(<Component path={[invalidParam]} />);
      const text = wrapper.find('span').text();
      if (text !== 'undefined') {
        errors.push(`expected "undefined" - useRequestState([${JSON.stringify(invalidParam)}])`);
      }
    });
    expect(errors).toEqual([]);
  });

});
