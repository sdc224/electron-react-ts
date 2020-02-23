import { GitErrorMessages } from './enums';

export default class GitError extends Error {
  message: GitErrorMessages;

  constructor(message: GitErrorMessages) {
    super(message);
    Object.setPrototypeOf(this, GitError.prototype);
    this.message = message;
  }
}
