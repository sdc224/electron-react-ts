import { createStyles } from '@material-ui/core';

export default () =>
  createStyles({
    windowButtons: {
      userSelect: 'none',
      cursor: 'default',
      borderRadius: 0,
      minWidth: '48px',
      '&:hover': {
        background: 'rgba(255,255,255,0.3)'
      },
      '&:active': {
        background: 'rgba(255,255,255,0.5)'
      }
    },
    closeButton: {
      '&:hover': {
        background: '#E81123 !important'
      },
      '&:active': {
        background: '#f1707a !important',
        color: '#000'
      }
    }
  });
