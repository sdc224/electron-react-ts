import React from 'react';

interface IAcceptMergeRequestProps {
  className?: string;
}

const AcceptMergeRequest = ({ className }: IAcceptMergeRequestProps) => {
  return <div className={className}>From Accept Merge Request</div>;
};

export default AcceptMergeRequest;
