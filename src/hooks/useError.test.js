/*
 * @flow
 */

import React from 'react';

import { mount } from 'enzyme';

import useError from './useError';

import { ERROR } from '../constants/redux';
import { INVALID_PARAMS } from '../testing/InvalidParams';
import { MOCK_SAGA_ERROR } from '../utils/axios/mocks';

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
  const error = useError(path);
  return (
    <div>
      {/* $FlowFixMe */}
      <span id="message">{`${error ? error.message : 'undefined'}`}</span>
      <span id="status">{`${error ? error.status : 'undefined'}`}</span>
      <span id="statustext">{`${error ? error.statusText : 'undefined'}`}</span>
    </div>
  );
};

describe('useError', () => {

  afterEach(() => {
    mockUseSelector.mockClear();
  });

  test('should return Error', () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({
      [MOCK_REDUCER]: {
        [MOCK_ACTION]: {
          [ERROR]: MOCK_SAGA_ERROR,
        },
      },
    }));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('#message').text()).toEqual(MOCK_SAGA_ERROR.message);
    expect(wrapper.find('#status').text()).toEqual(`${MOCK_SAGA_ERROR.status}`);
    expect(wrapper.find('#statustext').text()).toEqual(MOCK_SAGA_ERROR.statusText);
  });

  test('should return undefined if not in state', () => {

    mockUseSelector.mockImplementationOnce((callback) => callback({}));

    const wrapper = mount(<Component path={[MOCK_REDUCER, MOCK_ACTION]} />);
    expect(wrapper.find('#message').text()).toEqual('undefined');
    expect(wrapper.find('#status').text()).toEqual('undefined');
    expect(wrapper.find('#statustext').text()).toEqual('undefined');
  });

  test('should correctly handle invalid parameters', () => {
    const errors = [];
    INVALID_PARAMS.forEach((invalidParam) => {
      const wrapper = mount(<Component path={invalidParam} />);
      const text = wrapper.find('#message').text();
      if (text !== 'undefined') {
        errors.push(`expected "undefined" - useError(${JSON.stringify(invalidParam)})`);
      }
    });
    INVALID_PARAMS.forEach((invalidParam) => {
      const wrapper = mount(<Component path={[invalidParam]} />);
      const text = wrapper.find('#message').text();
      if (text !== 'undefined') {
        errors.push(`expected "undefined" - useError([${JSON.stringify(invalidParam)}])`);
      }
    });
    expect(errors).toEqual([]);
  });

});
