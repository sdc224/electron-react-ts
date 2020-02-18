import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      height: `calc(100% - ${theme.spacing(4) * 3}px)`,
      padding: theme.spacing(4)
    },
    headerText: {
      marginBottom: theme.spacing(1)
    },
    main: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2
    },
    selectDiv: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
      borderRadius: 4,
      padding: theme.spacing(1),
      // TODO : Responsiveness
      height: 44,
      display: 'flex',
      alignItems: 'center'
    },
    selectRightArea: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: theme.spacing(1),
      width: '100%'
    },
    cloneButton: {
      width: 150,
      alignSelf: 'flex-end',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    progressBackdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: `rgba(0, 0, 0, 0.8)`,
      color: theme.palette.white
    },
    progressText: {
      color: theme.palette.white,
      textAlign: 'right',
      marginTop: theme.spacing(2)
    }
  });
