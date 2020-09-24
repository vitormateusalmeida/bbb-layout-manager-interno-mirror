import React from 'react';
import NavBar from './component';
import LayoutContext from '../Layout/context';

const NavBarContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { navBar } = output;

  return <NavBar {...navBar} />
}

export default LayoutContext.withConsumer(NavBarContainer);