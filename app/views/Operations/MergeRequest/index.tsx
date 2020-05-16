import React from 'react';
import { Typography } from '@material-ui/core';
import RadioComponent from '@components/RadioComponent';

const MergeRequest = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <header>
        <Typography variant="h1">Merge Request</Typography>
      </header>
      <main>
        <RadioComponent
          radioProps={[
            { id: 'female', label: 'Female', value: 'female' },
            { id: 'male', label: 'Male', value: 'male' }
          ]}
          ariaLabel="gender"
          groupName="gender"
          initialValue="female"
        />
      </main>
    </div>
  );
};

export default MergeRequest;
