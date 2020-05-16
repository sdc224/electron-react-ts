import { Gitlab } from 'gitlab';
import credentials from '@private/credentials';

export const initialize = () => new Gitlab(credentials);

export const getAllProjects = async () => {
  const res = await initialize().Projects.all();
  return res;
};
