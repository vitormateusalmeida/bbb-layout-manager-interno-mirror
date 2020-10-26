import React from 'react';
import SidebarNavigation from './component';
import LayoutContext from '../Layout/context';

const SidebarNavigationContainer = props => {
  const { contextState, contextDispatch } = props;
  const { output } = contextState;
  const { sidebarNavigation } = output;

  if (sidebarNavigation.width === 0) return null;

  return <SidebarNavigation {...sidebarNavigation} contextDispatch={contextDispatch} />
}

export default LayoutContext.withConsumer(SidebarNavigationContainer);