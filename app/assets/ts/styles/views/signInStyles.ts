import { Theme, createStyles } from '@material-ui/core';
import AuthImage from '@images/auth.jpg';

export default (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      height: '100%'
    },
    grid: {
      height: '100%'
    },
    quoteContainer: {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    quote: {
      // backgroundColor: theme.palette.neutral,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${AuthImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    quoteInner: {
      textAlign: 'center',
      flexBasis: '600px'
    },
    quoteText: {
      color: theme.palette.white,
      fontWeight: 300
    },
    name: {
      marginTop: theme.spacing(3),
      color: theme.palette.white
    },
    bio: {
      color: theme.palette.white
    },
    contentContainer: {},
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    contentHeader: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    infoToolbar: {
      padding: 0,
      minHeight: 'auto'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    },
    signInWithInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    logoImage: {
      marginLeft: theme.spacing(4)
    },
    contentBody: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center'
      }
    },
    form: {
      paddingLeft: 100,
      paddingRight: 100,
      paddingBottom: 125,
      flexBasis: 700,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    title: {
      marginTop: theme.spacing(3),
      color: '#000000'
    },
    socialButtons: {
      marginTop: theme.spacing(3)
    },
    socialIcon: {
      marginRight: theme.spacing(1)
    },
    sugestion: {
      marginTop: theme.spacing(2)
    },
    textField: {
      marginTop: theme.spacing(2)
    },
    signInButton: {
      margin: theme.spacing(2, 0)
    },
    signUpLink: {
      fontWeight: 'bold'
    }
  });
