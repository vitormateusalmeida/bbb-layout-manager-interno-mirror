import React from 'react';
import NavBar from './component';
import LayoutContext from '../Layout/context';

const NavBarContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { navBar } = output;

  if (navBar.width === 0) return null;

  return <NavBar {...navBar} />
}

export default LayoutContext.withConsumer(NavBarContainer);