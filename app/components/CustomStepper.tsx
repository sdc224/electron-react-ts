import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

interface ICustomStepperProps {
  steps: string[];
  activeStep: number;
}

const CustomStepper = ({ steps, activeStep = 0 }: ICustomStepperProps) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
