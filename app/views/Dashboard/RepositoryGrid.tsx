import React from 'react';
import CustomCard from '@components/CustomCard';
import {
  Grid,
  Typography,
  IconButton,
  Toolbar,
  makeStyles,
  ToolbarProps
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { useProjects } from '@ducks/projects/selectors';
import styles from '@viewsTSStyles/repositoryGridStyles';
import Loading from '@components/Loading';
import { checkStringEmpty } from '@utils/stringHelper';
import { randomColor } from '@utils/cssHelper';

const useStyles = makeStyles(styles);

interface IRepositoryGridProps {
  key?: string;
}

const ModifiedToolbar: React.FC<ToolbarProps> = ({
  children,
  ...props
}: ToolbarProps) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar} {...props}>
      {children}
    </Toolbar>
  );
};

const RepositoryGrid: React.FC<IRepositoryGridProps> = () => {
  const { projectState, getAllProjects } = useProjects();

  React.useEffect(() => {
    getAllProjects();
  }, []);

  if (projectState.loading) {
    return <Loading />;
  }
  if (projectState.error) {
    return <Typography>Unexpected Error</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {projectState.projects.map(project => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={project.id}>
          <CustomCard
            id={project.id}
            key={project.id}
            avatarColor={randomColor()}
            avatarText={project.name[0].toUpperCase()}
            title={project.namespace.name}
            info={project.name}
            body={checkStringEmpty(project.description)}
            cardActionButtons={
              <>
                <ModifiedToolbar title="Mark as Favorite">
                  <IconButton size="small">
                    <FavoriteIcon />
                  </IconButton>
                </ModifiedToolbar>
                <ModifiedToolbar title="Star this project">
                  <IconButton size="small">
                    <StarIcon />
                  </IconButton>
                </ModifiedToolbar>
                {project.hasDotGitFolder && (
                  <ModifiedToolbar title="Fork Update">
                    <IconButton size="small">
                      <DynamicFeedIcon />
                    </IconButton>
                  </ModifiedToolbar>
                )}
              </>
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RepositoryGrid;
