import { Theme, createStyles } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7'
      }
    },
    root: {
      textTransform: 'none',
      color: theme.palette.black,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1
      }
    }
  });
