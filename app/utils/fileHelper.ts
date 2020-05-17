import { promises, PathLike } from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const folderOrFileExist = (name: PathLike) =>
  promises
    .access(name)
    .then(() => true)
    .catch(() => false);
