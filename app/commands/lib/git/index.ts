// import { IAuth } from '../authentication';

export interface IGit {
  // readonly auth: IAuth;
  init(): void;
}

export abstract class Git implements IGit {
  // auth: IAuth;
  // private readonly error: IError;
  // private readonly exception: IException;
  // private readonly performance: IPerformance;
  // private readonly execution: IExecution;

  init(): void {
    console.log(this);
  }
}
