import React from 'react';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

interface IHideOnScrollProps {
  children: React.ReactElement;
  threshold?: number;
}

const HideOnScroll: React.FC<IHideOnScrollProps> = ({
  children,
  threshold = 0
}: IHideOnScrollProps) => {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    threshold
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
