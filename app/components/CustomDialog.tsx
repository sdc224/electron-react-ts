import React from 'react';
import {
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

interface ICustomDialogProps {
  actions?: React.ReactNode;
  content?: React.ReactNode;
  contentText?: string;
  handleClose(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  id: string;
  open: boolean;
  title: string | React.ReactNode;
}

const CustomDialog = ({
  actions,
  content,
  contentText,
  handleClose,
  id,
  open,
  title,
  ...dialogProps
}: ICustomDialogProps) => {
  const modId = `dialog${id}`;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby={modId}
      {...dialogProps}
    >
      <DialogTitle id={modId}>{title}</DialogTitle>
      <DialogContent>
        {content || <DialogContentText>{contentText}</DialogContentText>}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CustomDialog;
