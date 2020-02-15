import { Store, AnyAction } from 'redux';
import { configureStore } from '@state/configureStore';

// export interface IDispatch {}

// TODO : Use this class
export default class Dispatch {
  public static dispatcher(action: AnyAction, mainStore?: Store) {
    const store: Store = mainStore || configureStore();
    store.dispatch(action);
  }

  public static getState(mainStore?: Store) {
    const store: Store = mainStore || configureStore();
    return store.getState();
  }
}
