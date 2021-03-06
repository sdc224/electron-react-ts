import { safeCheckEmptyDirectory } from '@commands/utils';
import * as path from 'path';
import { ICloneProgress } from '../progress/definitions';
import { IGitExecutionOptions } from '../execution';
import executionOptionsWithProgress from '../progress/readSTD';
import CloneProgressParser from '../progress/clone';
import { git } from '../../gitTerminal';

/**
 * Clones a repository from a given url into to the specified path.
 *
 * @param url     - The remote repository URL to clone from
 *
 * @param repoPath    - The destination path for the cloned repository. If the
 *                  path does not exist it will be created. Cloning into an
 *                  existing directory is only allowed if the directory is
 *                  empty.
 *
 * @param options  - Options specific to the clone operation, see the
 *                   documentation for CloneOptions for more details.
 *
 * @param progressCallback - An optional function which will be invoked
 *                           with information about the current progress
 *                           of the clone operation. When provided this enables
 *                           the '--progress' command line flag for
 *                           'git clone'.
 *
 */
// eslint-disable-next-line import/prefer-default-export
export const clone = async (
  url: string,
  repoPath: string,
  options: {},
  // options: CloneOptions,
  progressCallback?: (progress: ICloneProgress) => void
): Promise<void> => {
  // TODO : For Github Enterprise
  // const networkArguments = await gitNetworkArguments(null, options.account);
  // const env = envForAuthentication(options.account);
  // const args = [...networkArguments, 'clone', '--recursive'];
  // let opts: IGitExecutionOptions = { env };
  const baseFolderName =
    decodeURI(url)
      // eslint-disable-next-line no-useless-escape
      .replace(/[\/]+$/, '')
      // eslint-disable-next-line no-useless-escape
      .replace(/^.*[\/\\]/, '')
      .replace(/\.git$/, '') || 'repository';
  const folderName = baseFolderName;
  const folderPath = path.join(repoPath, folderName);

  await safeCheckEmptyDirectory(folderPath);

  const args = ['clone', '--recursive'];
  let opts: IGitExecutionOptions = options;

  if (progressCallback) {
    args.push('--progress');

    const title = `Cloning into ${folderName}`;
    const kind = 'clone';

    opts = await executionOptionsWithProgress(
      opts,
      // { ...opts, trackLFSProgress: true },
      new CloneProgressParser(),
      (progress) => {
        const description =
          progress.kind === 'progress' ? progress.details.text : progress.text;
        const value = progress.percent;

        progressCallback({
          kind,
          title,
          description,
          value
        });
      }
    );

    // TODO : increase initial progress a bit... 0.1
    // Initial progress
    progressCallback({
      kind,
      title,
      value: 0
    });
  }

  // TODO : Switch to a branch after clone
  // if (options.branch) {
  //   args.push('-b', options.branch);
  // }

  args.push('--', url, folderPath);

  await git(args, '', 'clone', opts);
};

/* public clone = async (
    url: string,
    currentWorkingDirectory: string = this.repositoryPath,
    progress: Progress = new Progress()
  ) => {
    try {
      const gitUrl = this.parseUrl(url);
      const baseFolderName =
        decodeURI(url)
          // eslint-disable-next-line no-useless-escape
          .replace(/[\/]+$/, '')
          // eslint-disable-next-line no-useless-escape
          .replace(/^.*[\/\\]/, '')
          .replace(/\.git$/, '') || 'repository';

      const folderName = baseFolderName;
      const folderPath = path.join(currentWorkingDirectory, folderName);

      await mkdirp(folderName);

      let totalProgress = 0;
      let previousProgress = 0;

      progress.report(0);

      const onSpawn = (data: Buffer) => {
        const line = convertArrayBufferToString(data);
        let match: RegExpMatchArray | null = null;

        if (RegularExpressions.GitCloneCountObjects.test(line)) {
          console.log('1');
          match = RegularExpressions.GitCloneCountObjects.exec(line);
          totalProgress = Math.floor(parseInt(match![1], 10) * 0.1);
        } else if (RegularExpressions.GitCloneCompressObjects.test(line)) {
          console.log('2');
          match = RegularExpressions.GitCloneCompressObjects.exec(line);
          totalProgress = 10 + Math.floor(parseInt(match![1], 10) * 0.1);
        } else if (RegularExpressions.GitCloneReceiveObjects.test(line)) {
          console.log('3');
          match = RegularExpressions.GitCloneReceiveObjects.exec(line);
          totalProgress = 20 + Math.floor(parseInt(match![1], 10) * 0.4);
        } else if (RegularExpressions.GitCloneReceiveDeltas.test(line)) {
          console.log('4');
          match = RegularExpressions.GitCloneReceiveDeltas.exec(line);
          totalProgress = 60 + Math.floor(parseInt(match![1], 10) * 0.4);
        }

        // console.log('progress', line, totalProgress, previousProgress);

        if (totalProgress !== previousProgress) {
          progress.report(totalProgress - previousProgress);
          previousProgress = totalProgress;
        }
      };

      await this.gitTerminal.execute(`clone ${gitUrl}`, ['--progress'], {
        cwd: currentWorkingDirectory,
        onSpawnStdout: onSpawn,
        onSpawnStderr: onSpawn
      });

      return folderPath;
    } catch (error) {
      if (error.stderr) {
        error.stderr = error.stderr.replace(/^Cloning.+$/m, '').trim();
        error.stderr = error.stderr.replace(/^ERROR:\s+/, '').trim();
      }

      throw error;
    }
  }; */
