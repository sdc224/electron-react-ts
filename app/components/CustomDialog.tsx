import React from 'react';
import {
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogProps
} from '@material-ui/core';

interface ICustomDialogProps extends DialogProps {
  actions?: React.ReactNode;
  content?: React.ReactNode;
  contentText?: string;
  handleClose(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  id: string;
  open: boolean;
  titleClassName?: string;
  dividers?: boolean;
}

const CustomDialog = ({
  actions,
  content,
  contentText,
  handleClose,
  id,
  open,
  title = 'Dialog',
  titleClassName,
  dividers = false,
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
      <DialogTitle className={titleClassName} id={modId}>
        {title}
      </DialogTitle>
      <DialogContent dividers={dividers}>
        {content || <DialogContentText>{contentText}</DialogContentText>}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CustomDialog;
