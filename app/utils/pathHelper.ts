import { readdirSync, PathLike } from 'fs';
import { resolve } from 'path';

export const getDirectoryNames = (source: PathLike) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const getDirectoryNameWithPath = (source: PathLike) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => resolve(source as string, dirent.name));
