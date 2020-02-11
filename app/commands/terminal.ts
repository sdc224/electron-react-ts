import * as childProcess from 'child_process';
import { platform } from 'os';
import ITerminal from './ITerminal';

// TODO
/* enum ShellType {
   PowerShell,
   Bash,
   GitBash
 } */

export default class Terminal implements ITerminal {
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
   * @param {string} cwd The working directory to run the command in.
   * @return {Promise} A promise for the completion of the command.
   */
  public execute(
    command: string,
    args: string[] = [],
    cwd: string = this.options.cwd!
  ): Promise<Buffer> {
    // eslint-disable-next-line consistent-return
    return new Promise<Buffer>((resolve, reject) => {
      if (!command || !cwd) {
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

      // TODO Delete
      // console.log('+', command, args.join(' '), '# in', cwd);

      const proc = childProcess.spawn(command, args, this.options);

      proc.stdout!.on('data', (chunk: Buffer) => {
        stdout = Buffer.from(chunk);
      });

      proc.stderr!.on('data', (chunk: Buffer) => {
        stderr = Buffer.from(chunk);
      });

      proc.on('error', error =>
        reject(
          new Error(
            `${command} ${args.join(' ')} in ${cwd} encountered error ${
              error.message
            }`
          )
        )
      );

      proc.on('exit', code => {
        if (code !== 0) {
          reject(
            new Error(
              `${command} ${args.join(' ')} in ${cwd} exited with code ${code}
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
