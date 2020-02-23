import { AppErrorMessages } from './enums';

export default class AppError extends Error {
  message: AppErrorMessages;

  constructor(message: AppErrorMessages) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    this.message = message;
  }
}
