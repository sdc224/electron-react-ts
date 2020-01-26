import { IModule } from 'redux-dynamic-modules';
import { ICounterAwareState } from './types';
import { counterReducer } from './reducers';

const counterModule: IModule<ICounterAwareState> = {
  id: 'counter',
  reducerMap: {
    counter: counterReducer
  }
};

export default counterModule;
