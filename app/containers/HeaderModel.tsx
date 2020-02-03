import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import Header from '@components/Header';
import drawerModule from '@ducks/drawer/module';
import { useDrawer } from '@ducks/drawer/selectors';

export default function HeaderModel() {
  const { handleDrawerToggle } = useDrawer();

  return (
    <DynamicModuleLoader modules={[drawerModule]}>
      <Header handleDrawerToggle={handleDrawerToggle} />
    </DynamicModuleLoader>
  );
}
