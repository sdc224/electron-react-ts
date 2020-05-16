import React from 'react';
import Header from '@components/Header';
import { useDrawer } from '@ducks/drawer/selectors';

export default function HeaderModel() {
  const { handleDrawerToggle } = useDrawer();

  return <Header handleDrawerToggle={handleDrawerToggle} />;
}
