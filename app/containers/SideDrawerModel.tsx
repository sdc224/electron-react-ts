import React from 'react';
import SideDrawer from '@components/SideDrawer';
import { useDrawer } from '@ducks/drawer/selectors';

export default function SideDrawerModel() {
  const { drawerState, handleDrawerToggle } = useDrawer();

  return (
    <SideDrawer
      mobileOpen={drawerState!.mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
    />
  );
}
