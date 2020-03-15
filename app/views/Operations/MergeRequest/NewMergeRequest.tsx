import React from 'react';

interface INewMergeRequestProps {
  className?: string;
}

const NewMergeRequest = ({ className }: INewMergeRequestProps) => {
  return <div className={className}>From New Merge Request</div>;
};

export default NewMergeRequest;
