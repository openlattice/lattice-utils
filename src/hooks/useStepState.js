/*
 * @flow
 */

import { useState } from 'react';

const inRange = (step :number, max :number) => step >= 0 && step < max;

export default function useStepState(
  max :number,
  initial :number = 0,
) :[
  number,
  () => void,
  () => void,
  (step :number) => void,
] {

  const [step, setStep] = useState(initial);

  if (!inRange(initial, max)) {
    throw new RangeError(`"initial" must be between 0 and ${max}`);
  }

  const goToStep = (targetStep :number) => {
    if (inRange(targetStep, max)) {
      setStep(targetStep);
    }
  };

  const stepBack = () => goToStep(step - 1);
  const stepNext = () => goToStep(step + 1);

  return [step, stepBack, stepNext, goToStep];
}
