import { ChildProcess } from 'child_process';
import byline from 'byline';
import { assign } from '@app/commands/utils';
import { GitProgressParser, IGitProgress, IGitOutput } from './git';
import { IGitExecutionOptions } from '../execution';

/**
 * Returns a callback which can be passed along to the processCallback option
 * in IGitExecution. The callback then takes care of reading stderr of the
 * process and parsing its contents using the provided parser.
 */
function createProgressProcessCallback(
  parser: GitProgressParser,
  // lfsProgressPath: string | null,
  progressCallback: (progress: IGitProgress | IGitOutput) => void
): (process: ChildProcess) => void {
  return (process) => {
    // TODO : Future Plans
    // if (lfsProgressPath) {
    //   const lfsParser = new GitLFSProgressParser();
    //   const disposable = tailByLine(lfsProgressPath, line => {
    //     const progress = lfsParser.parse(line);
    //     progressCallback(progress);
    //   });

    //   process.on('close', () => {
    //     disposable.dispose();
    //     // the order of these callbacks is important because
    //     //  - unlink can only be done on files
    //     //  - rmdir can only be done when the directory is empty
    //     //  - we don't want to surface errors to the user if something goes
    //     //    wrong (these files can stay in TEMP and be cleaned up eventually)
    //     fs.unlink(lfsProgressPath, err => {
    //       if (err == null) {
    //         const directory = path.dirname(lfsProgressPath);
    //         fs.rmdir(directory, () => {});
    //       }
    //     });
    //   });
    // }

    // If Node.js encounters a synchronous runtime error while spawning
    // `stderr` will be undefined and the error will be emitted asynchronously
    if (process.stderr) {
      byline(process.stderr).on('data', (line: string) => {
        progressCallback(parser.parse(line));
      });
    }
  };
}

/**
 * Merges an instance of IGitExecutionOptions with a process callback provided
 * by createProgressProcessCallback.
 *
 * If the given options object already has a processCallback specified it will
 * be overwritten.
 */
export default async function executionOptionsWithProgress(
  options: IGitExecutionOptions,
  parser: GitProgressParser,
  progressCallback: (progress: IGitProgress | IGitOutput) => void
): Promise<IGitExecutionOptions> {
  // TODO : Future Plans
  // let lfsProgressPath = null;
  // let env = {};
  // if (options.trackLFSProgress) {
  //   try {
  //     lfsProgressPath = await createLFSProgressFile();
  //     env = { GIT_LFS_PROGRESS: lfsProgressPath };
  //   } catch (e) {
  //     log.error('Error writing LFS progress file', e);
  //     env = { GIT_LFS_PROGRESS: null };
  //   }
  // }

  return assign(options, {
    processCallback: createProgressProcessCallback(
      parser,
      // lfsProgressPath,
      progressCallback
    ),
    env: options.env
    // env: merge(options.env, env)
  });
}
