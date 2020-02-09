import React from 'react';
import GitIconWhite from '@images/logo/Git-Icon-White.svg';

interface IProps {
  iconColor?: 'white' | 'black' | 'normal';
}

type Props = IProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

const GitIcon: React.FC<Props> = ({ iconColor = 'normal', ...rest }: Props) => {
  switch (iconColor) {
    case 'white':
      return <img src={GitIconWhite} alt="Git" {...rest} />;

    default:
      return (
        // <Icon {...rest}>
        //   <svg {...rest} />
        // </Icon>
        <div>Hello</div>
      );
  }
};

export default GitIcon;
