import React from 'react';
import SideBarNavigation from './component';
import LayoutContext from '../Layout/context';

const SideBarNavigationContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { sideBarNavigation } = output;

  if (sideBarNavigation.width === 0) return null;

  return <SideBarNavigation {...sideBarNavigation} />
}

export default LayoutContext.withConsumer(SideBarNavigationContainer);