import fs from 'fs';
import { dirname } from 'path';
/**
 * A utility funciton for checking whether a folder is empty or not
 * source: https://stackoverflow.com/questions/39217271/how-to-determine-whether-the-directory-is-empty-directory-with-nodejs
 * @param  {string} directoryName The directory name for which you want to check
 * @returns {Promise<boolean>} True if the folder is empty
 */
export async function isDirEmpty(directoryName: string): Promise<boolean> {
  const files = await fs.promises.readdir(directoryName);
  return files.length === 0;
}

export function nfcall<R>(fn: Function, ...args: any[]): Promise<R> {
  return new Promise<R>((resolve, reject) =>
    fn(...args, (err: any, r: any) => (err ? reject(err) : resolve(r)))
  );
}

export async function safeCheckEmptyDirectory(path: string): Promise<boolean> {
  // is root?
  if (path === dirname(path)) {
    return true;
  }
  try {
    const stat = await nfcall<fs.Stats>(fs.stat, path);

    if (stat.isDirectory()) {
      if (await isDirEmpty(path)) return true;
      throw new Error(`'${path}' exists and is not an empty directory.`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return true;
    }

    throw error;
  }

  throw new Error(`'${path}' exists and is not a directory.`);
}

// TODO : Clone with folder names appended numbers, so that we can clone existing repo
/**
 * Creates a new directory safely cross-platfrom
 * @param  {string} path  Where to create the directory
 * @param  {number} mode? Set its access level: Read, Write and Execute
 * @returns Promise
 */
export async function mkdirp(path: string, mode?: number): Promise<boolean> {
  const mkdir = async () => {
    try {
      await nfcall(fs.mkdir, path, mode);
    } catch (err) {
      if (err.code === 'EEXIST') {
        const stat = await nfcall<fs.Stats>(fs.stat, path);

        if (stat.isDirectory()) {
          if (isDirEmpty(path)) return;

          throw new Error(`'${path}' exists and is not an empty directory.`);
        }

        throw new Error(`'${path}' exists and is not a directory.`);
      }

      throw err;
    }
  };

  // is root?
  if (path === dirname(path)) {
    return true;
  }

  try {
    await mkdir();
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }

    await mkdirp(dirname(path), mode);
    await mkdir();
  }

  return true;
}

/** Create a copy of an object by assigning/merging it with a subset of its properties. */
export function assign<T>(destination: T, ...sources: any[]): T {
  sources.forEach((source) => {
    Object.keys(source).forEach(
      // eslint-disable-next-line no-return-assign, no-param-reassign
      (key) => ((destination as any)[key] = source[key])
    );
  });

  return destination;
}
