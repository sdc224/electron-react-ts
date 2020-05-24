import React from 'react';
import CustomCard from '@components/CustomCard';
import {
  Grid,
  IconButton,
  Toolbar,
  makeStyles,
  ToolbarProps
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import InfiniteScroll from '@components/InfiniteScroll';
import { useProjects } from '@ducks/projects/selectors';
import styles from '@viewsTSStyles/repositoryGridStyles';
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
  const ref = React.useRef(null);
  const endRef = React.useRef(null);
  const { projectState, getAllProjects } = useProjects();

  // if (projectState.loading) {
  //   return <Loading />;
  // }

  // if (projectState.error) {
  //   return <Typography>Unexpected Error</Typography>;
  // }

  // React.useEffect(() => {
  //   if (endRef && endRef.current)
  //     endRef.current.scrollIntoView({ behavior: 'smooth' });
  // }, [endRef!]);

  // if (ref && ref.current) {
  //   const { offsetTop, clientHeight, pageYOffset, innerHeight } = ref.current;
  //   console.log(offsetTop, clientHeight, pageYOffset, innerHeight);
  //   ref.current.scrollIntoView({ behavior: 'smooth' });
  // }

  return (
    <InfiniteScroll
      reducer={{ ...projectState, data: projectState.projects }}
      getData={getAllProjects}
    >
      <Grid container spacing={2} innerRef={ref}>
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
            <div ref={endRef} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default RepositoryGrid;
