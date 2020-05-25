import React from 'react';
import Button from '@material-ui/core/Button';
import CustomDialog from './CustomDialog';

export interface IConfirmationOptions {
  id: string;
  catchOnCancel?: boolean;
  variant: 'danger' | 'info';
  title: string;
  description: string;
}

interface IConfirmationDialogProps extends IConfirmationOptions {
  open: boolean;
  onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  id,
  open,
  title,
  variant,
  description,
  onSubmit,
  onClose
}: IConfirmationDialogProps) => (
  <CustomDialog
    open={open}
    id={`alert${id}`}
    title={title}
    contentText={description}
    handleClose={onClose}
    actions={
      <>
        {variant === 'danger' && (
          <>
            <Button color="primary" onClick={onSubmit}>
              Yes, I agree
            </Button>
            <Button color="primary" onClick={onClose} autoFocus>
              CANCEL
            </Button>
          </>
        )}

        {variant === 'info' && (
          <Button color="primary" onClick={onSubmit}>
            OK
          </Button>
        )}
      </>
    }
  />
);
