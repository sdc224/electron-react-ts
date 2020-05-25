import React from 'react';
import {
  ConfirmationDialog,
  IConfirmationOptions
} from '@components/ConfirmationDialog';

const ConfirmationServiceContext = React.createContext<
  (options: IConfirmationOptions) => Promise<void>
>(Promise.reject);

export const useConfirmation = () =>
  React.useContext(ConfirmationServiceContext);

export const ConfirmationServiceProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [
    confirmationState,
    setConfirmationState
  ] = React.useState<IConfirmationOptions | null>(null);

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openConfirmation = (options: IConfirmationOptions) => {
    setConfirmationState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationServiceContext.Provider value={openConfirmation}>
        {children}
      </ConfirmationServiceContext.Provider>

      <ConfirmationDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState!}
      />
    </>
  );
};
