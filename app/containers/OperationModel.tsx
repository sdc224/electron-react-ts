import React from 'react';
import { useOperation } from '@ducks/operation/selectors';

// interface IProps {
//   title?: string;
//   children?: React.ReactNode;
// }

const OperationModel: React.FC = () => {
  const { operationState } = useOperation();

  // let ChildrenComponent = Fragment;

  // if (operationState!.children) ChildrenComponent = operationState!.children;

  return (
    <div style={{ padding: 10 }}>
      <header>
        <h1
          style={{
            fontSize: '1.5rem',
            marginBlockStart: 0
          }}
        >
          {operationState!.title}
        </h1>
      </header>
      <main>{/* <ChildrenComponent /> */}</main>
      <footer />
    </div>
  );
};

export default OperationModel;
