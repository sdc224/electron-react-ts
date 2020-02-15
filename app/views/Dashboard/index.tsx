import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import styles from '@viewsTSStyles/dashboardStyles';

const useStyles = makeStyles(styles);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        pretium, velit in interdum auctor, eros nisi molestie ipsum, in
        facilisis quam augue eget urna. Proin tincidunt ac est quis pharetra.
        Vestibulum elit mauris, sodales in arcu a, volutpat tempus mi. Nulla
        mattis dolor ac arcu consequat molestie. Phasellus ut lacinia dolor.
        Donec nec aliquet dui. Maecenas iaculis efficitur lobortis. Suspendisse
        faucibus risus id arcu porta auctor. Duis et cursus lorem. Aenean ut
        justo non nisl fermentum convallis. Nam libero eros, hendrerit in
        gravida sit amet, accumsan eu leo. Donec a pellentesque purus, sed
        volutpat justo. Aenean vehicula nibh sem, eget commodo erat sollicitudin
        at. Morbi nec scelerisque nunc. Nulla facilisi. In hac habitasse platea
        dictumst. Etiam dui quam, finibus molestie nisl at, consequat finibus
        mi. Praesent iaculis tristique ex at feugiat. Nullam viverra odio
        tellus, in cursus velit tempor consectetur. Proin mattis quis justo eu
        congue. Sed a lacinia elit. Vestibulum posuere dui ultrices dapibus
        laoreet. Ut a ex in nibh finibus bibendum in vitae ligula. Vivamus
        tempus felis lectus, vel tempus diam fringilla non. Curabitur eleifend,
        erat quis sodales fermentum, enim lorem tempor ligula, vitae faucibus
        metus eros ut nisl. Nunc ut scelerisque tortor, ac cursus lacus. Aliquam
        eleifend pretium elit quis aliquam. Nullam fermentum placerat turpis nec
        semper. Proin quis lorem maximus, malesuada lacus ut, facilisis magna.
        Suspendisse ut sagittis nisi. Morbi porta placerat enim, at efficitur
        tellus pretium sollicitudin. Morbi placerat, dui ut eleifend tempor,
        nunc lectus facilisis turpis, nec sodales nisi massa consectetur odio.
        Nam volutpat elit et velit tincidunt, in consequat felis cursus. Sed
        varius sapien sed libero tempor facilisis.
      </Typography>
    </div>
  );
};

export default Dashboard;
