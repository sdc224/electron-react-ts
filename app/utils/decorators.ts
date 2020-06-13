// TODO : Don't delete
// Required for creating decorators
// Unused file
/* export class CatchDecoratorStore {
  handler: Function | undefined;

  setHandler(handler: Function) {
    this.handler = handler;
  }
}

export function Catch(localHandler?: Function) {
  return function<TFunction extends Function>(
    target: any,
    key: string,
    descriptor?: TypedPropertyDescriptor<any>
  ): any {
    console.log(target, key, descriptor);
    const originalMethod = descriptor?.value;

    const descriptorCopy = descriptor!;

    descriptorCopy.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(target, args);
      } catch (error) {
        const { handler } = new CatchDecoratorStore();

        if (localHandler) {
          localHandler.call(null, error, this);
        } else if (handler) {
          handler();
        } else {
          console.warn(error.message);
        }
      }
    };

    Object.defineProperty(target, key, descriptorCopy);

    return descriptorCopy;
  };
} */
