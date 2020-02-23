import { GitlabErrorMessages } from './enums';

export default class GitlabError extends Error {
  message: GitlabErrorMessages;

  constructor(message: GitlabErrorMessages) {
    super(message);
    Object.setPrototypeOf(this, GitlabError.prototype);
    this.message = message;
  }
}
