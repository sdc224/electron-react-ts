import Q from 'q';
import { isObjectEmpty } from '@utils/objectHelper';
import { convertArrayBufferToString } from '@utils/typeConverters';
import ITerminal from './ITerminal';
import Terminal from './terminal';

// TODO: Error Handling

export default class GitTerminal implements ITerminal {
  private terminal: Terminal;

  constructor(currentWorkingDirectory: string) {
    this.terminal = new Terminal(currentWorkingDirectory);
  }

  async execute(
    command: string,
    args?: string[],
    cwd?: string
  ): Promise<string> {
    if (isObjectEmpty(this.terminal))
      throw new Error('Terminal is not defined');

    const newCommand = `git ${command}`;

    try {
      const res = await this.terminal.execute(newCommand, args, cwd);
      return convertArrayBufferToString(res);
    } catch (error) {
      throw new Error('Git Execute failed, conversion unsuccessful');
    }
  }
}
