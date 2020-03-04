import React from 'react';

interface IWelcomeViewProps {
  className?: string;
}

const WelcomeView: React.FC<IWelcomeViewProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos soluta
      similique quisquam! Rem, maxime consectetur eveniet obcaecati, saepe
      nostrum qui repellendus explicabo dolor, rerum vitae totam molestias.
      Quaerat, provident nam.
    </div>
  );
};

export default WelcomeView;
