import React from 'react';
import CustomCard from '@components/CustomCard';
import { Grid, Typography } from '@material-ui/core';
import { useProjects } from '@ducks/projects/selectors';
import Loading from '@components/Loading';
import { checkStringEmpty } from '@utils/stringHelper';
import { randomColor } from '@utils/cssHelper';

interface IRepositoryGridProps {
  key?: string;
}

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
            buttonContent="hello"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RepositoryGrid;
