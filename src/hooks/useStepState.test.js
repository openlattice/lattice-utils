/*
 * @flow
 */

/* eslint-disable react/require-default-props */

import React from 'react';

import { mount } from 'enzyme';

import useStepState from './useStepState';

const MAX_STEPS = 10;

const Component = ({
  initial,
  max = MAX_STEPS,
} :{
  initial ?:number;
  max ?:number;
}) => {
  const [step, stepBack, stepNext, goToStep] = useStepState(max, initial);
  return (
    <div>
      <span>{step}</span>
      <button id="step-back" onClick={stepBack} type="button">back</button>
      <button id="step-next" onClick={stepNext} type="button">next</button>
      <button id="go-to-step" onClick={(e) => goToStep(e.target.value)} type="button">go to step</button>
    </div>
  );
};

describe('useStepState', () => {

  test('should throw if initial step is out of range', () => {
    expect(() => mount(<Component initial={100} />)).toThrow();
  });

  test('stepBack should correctly decrement the step', () => {
    const wrapper = mount(<Component initial={2} />);
    expect(wrapper.find('span').text()).toEqual('2');
    wrapper.find('#step-back').simulate('click');
    expect(wrapper.find('span').text()).toEqual('1');
    wrapper.find('#step-back').simulate('click');
    expect(wrapper.find('span').text()).toEqual('0');
    wrapper.find('#step-back').simulate('click');
    expect(wrapper.find('span').text()).toEqual('0');
  });

  test('stepNext should correctly increment the step', () => {
    const wrapper = mount(<Component max={3} />);
    expect(wrapper.find('span').text()).toEqual('0');
    wrapper.find('#step-next').simulate('click');
    expect(wrapper.find('span').text()).toEqual('1');
    wrapper.find('#step-next').simulate('click');
    expect(wrapper.find('span').text()).toEqual('2');
    wrapper.find('#step-next').simulate('click');
    expect(wrapper.find('span').text()).toEqual('2');
  });

  test('goToStep should correctly set the step', () => {
    const wrapper = mount(<Component />);
    expect(wrapper.find('span').text()).toEqual('0');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 3 } });
    expect(wrapper.find('span').text()).toEqual('3');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 9 } });
    expect(wrapper.find('span').text()).toEqual('9');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 4 } });
    expect(wrapper.find('span').text()).toEqual('4');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 0 } });
    expect(wrapper.find('span').text()).toEqual('0');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 2 } });
    expect(wrapper.find('span').text()).toEqual('2');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 7 } });
    expect(wrapper.find('span').text()).toEqual('7');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 6 } });
    expect(wrapper.find('span').text()).toEqual('6');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 1 } });
    expect(wrapper.find('span').text()).toEqual('1');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 8 } });
    expect(wrapper.find('span').text()).toEqual('8');
    wrapper.find('#go-to-step').simulate('click', { target: { value: -100 } });
    expect(wrapper.find('span').text()).toEqual('8');
    wrapper.find('#go-to-step').simulate('click', { target: { value: 100 } });
    expect(wrapper.find('span').text()).toEqual('8');
  });

});
