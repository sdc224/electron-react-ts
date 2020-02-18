import React from 'react';

interface ILabelValueProps {
  label?: string;
  description?: string;
  value?: string;
  children?: React.ReactNode;
}

// TODO : Use this component
const LabelValue: React.FC<ILabelValueProps> = ({
  // children,
  // description,
  label
}: // value
ILabelValueProps) => {
  return <div>{label}</div>;
};

export default LabelValue;
