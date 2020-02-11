import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '@tsStyles/styles/components/loadingButtonStyles';
import { isObjectEmpty } from '@utils/objectHelper';

interface IReducer {
  loading: boolean;
  data: object;
  error: object;
}

interface IButtonContentProps {
  content: string | React.ReactNode;
  loadingContent?: string | React.ReactNode;
  errorContent?: string | React.ReactNode;
  reducer: IReducer;
}

interface ILoadingButtonProps extends IButtonContentProps {
  children?: React.ReactNode;
  onClick(): void;
}

const useStyles = makeStyles(styles);

const ButtonContent: React.FC<IButtonContentProps> = ({
  content,
  loadingContent,
  errorContent,
  reducer
}: IButtonContentProps): JSX.Element => {
  const classes = useStyles();

  if (reducer.loading) {
    return (loadingContent || <CircularProgress />) as JSX.Element;
  }

  if (reducer.error) {
    return (errorContent || <div>Error</div>) as JSX.Element;
  }

  if (!isObjectEmpty(reducer!.data)) return content as JSX.Element;

  return <div>Something went wrong</div>;
};
const LoadingButton: React.FC<ILoadingButtonProps> = ({
  children,
  onClick,
  ...rest
}: ILoadingButtonProps) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick}>{children || <ButtonContent {...rest} />}</Button>
  );
};

export default LoadingButton;
