import { IModule } from 'redux-dynamic-modules';
import { drawerReducer } from './reducers';
import { IDrawerAwareState } from './types';

const drawerModule: IModule<IDrawerAwareState> = {
  id: 'drawer',
  reducerMap: {
    drawer: drawerReducer
  } as any
};

export default drawerModule;
