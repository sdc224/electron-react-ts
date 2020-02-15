import * as childProcess from 'child_process';
import { platform } from 'os';
import { ICancellationToken } from './cancellation';

// TODO
/* enum ShellType {
   PowerShell,
   Bash,
   GitBash
 } */

export interface ITerminal {
  execute(
    command: string,
    args?: string[],
    options?: ISpawnOptions
  ): Promise<unknown>;
}

export interface ISpawnOptions extends childProcess.SpawnOptions {
  input?: string;
  encoding?: string;
  log?: boolean;
  cancellationToken?: ICancellationToken;
  onSpawnStdout?: (chunk: Buffer) => void;
  onSpawnStderr?: (chunk: Buffer) => void;
}

export class Terminal implements ITerminal {
  // TODO : ShellType
  /* private shellType: ShellType;
   constructor(shellType: ShellType) {
     this.shellType = shellType;
   } */
  private options: childProcess.SpawnOptions = {};

  /**
   * @param {string} cwd The working directory to run the command in.
   */
  constructor(cwd: string = __dirname) {
    if (platform() === 'win32') this.options = { shell: true };
    this.options = { ...this.options, cwd };
  }

  /**
   * Wrap executing a command in a promise
   * @param {string} command command to execute
   * @param {Array<string>} arguments Arguments to the command.
   * @param {ISpawnOptions} options The Spawn Options to run the command in.
   * @return {Promise} A promise for the completion of the command.
   */
  public execute(
    command: string,
    args: string[] = [],
    options: ISpawnOptions = this.options
  ): Promise<Buffer> {
    // eslint-disable-next-line consistent-return
    return new Promise<Buffer>((resolve, reject) => {
      if (!command || !options.cwd) {
        return reject(
          new Error(`Both command and working directory must be given`)
        );
      }

      if (
        args &&
        !args.every(arg => {
          const type = typeof arg;
          return type === 'boolean' || type === 'string' || type === 'number';
        })
      ) {
        return reject(
          new Error('All arguments must be a boolean, string or number')
        );
      }

      let stdout: Buffer;
      let stderr: Buffer;

      const newOptions = { ...options };

      if (!options.onSpawnStdout)
        newOptions.onSpawnStdout = (chunk: Buffer) => {
          stdout = Buffer.from(chunk);
        };

      if (!options.onSpawnStderr)
        newOptions.onSpawnStderr = (chunk: Buffer) => {
          stderr = Buffer.from(chunk);
        };

      // TODO Delete
      // console.log('+', command, args.join(' '), '# in', newOptions.cwd);

      const proc = childProcess.spawn(command, args, this.options);

      proc.stdout!.on('data', newOptions.onSpawnStdout!);

      proc.stderr!.on('data', newOptions.onSpawnStderr!);

      proc.on('error', error =>
        reject(
          new Error(
            `${command} ${args.join(' ')} in ${
              newOptions.cwd
            } encountered error ${error.message}`
          )
        )
      );

      proc.on('exit', code => {
        if (code !== 0) {
          reject(
            new Error(
              `${command} ${args.join(' ')} in ${
                newOptions.cwd
              } exited with code ${code}
            For Stack Trace: ${stderr}`
            )
          );
        } else {
          resolve(stdout);
        }
      });
    });
  }
}
