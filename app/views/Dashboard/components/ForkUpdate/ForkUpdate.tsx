import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ForkUpdateDialog from '@components/ForkUpdateDialog';

interface IForkUpdateProps {
  project: IRepository;
}

const ForkUpdate = ({ project }: IForkUpdateProps) => {
  const [open, setOpen] = React.useState(false);

  const handleForkUpdate = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton size="small" onClick={handleForkUpdate}>
        <DynamicFeedIcon />
      </IconButton>

      {open && (
        <ForkUpdateDialog
          open={open}
          project={project}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ForkUpdate;
