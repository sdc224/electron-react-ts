import { RegularExpressions } from '@constants/commandConstants';
import { isObjectEmpty } from '@utils/objectHelper';
import GitTerminal from './gitTerminal';

// TODO Error Handling

export default class Git {
  private gitVersion = '';

  private gitTerminal: GitTerminal;

  constructor(private repositoryPath: string) {
    this.gitTerminal = new GitTerminal(this.repositoryPath);
  }

  private async checkGitExists() {
    if (isObjectEmpty(this.gitTerminal))
      throw new Error('Git Terminal not defined');

    try {
      const res = await this.gitTerminal.execute('', ['--version']);
      this.gitVersion = res
        .trim()
        .split('\n')
        .filter((line: string) => !!line)
        .map(this.setGitVersion)
        .join();
    } catch (error) {
      throw new Error('Git is not installed');
    }
  }

  private setGitVersion = (line: string) => {
    if (RegularExpressions.GitVersion.test(line)) {
      return line.match(/(\w+\.)+\w+/g)![0];
    }

    return null;
  };

  public async init() {
    await this.checkGitExists();
    console.log(this.gitVersion);
  }
}
