import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import SideDrawer from '@components/SideDrawer';
import drawerModule from '@ducks/drawer/module';
import { useDrawer } from '@ducks/drawer/selectors';

export default function SideDrawerModel() {
  const { drawerState, handleDrawerToggle } = useDrawer();

  return (
    <DynamicModuleLoader strictMode modules={[drawerModule]}>
      <SideDrawer
        mobileOpen={drawerState!.mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </DynamicModuleLoader>
  );
}
