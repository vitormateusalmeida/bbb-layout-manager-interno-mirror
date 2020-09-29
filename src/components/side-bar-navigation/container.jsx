import React from 'react';
import SideBarNavigation from './component';
import LayoutContext from '../Layout/context';

const SideBarNavigationContainer = props => {
  const { contextState, contextDispatch } = props;
  const { output } = contextState;
  const { sideBarNavigation } = output;

  if (sideBarNavigation.width === 0) return null;

  return <SideBarNavigation {...sideBarNavigation} contextDispatch={contextDispatch} />
}

export default LayoutContext.withConsumer(SideBarNavigationContainer);