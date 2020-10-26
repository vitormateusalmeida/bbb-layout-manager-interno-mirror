import React from 'react';
import SidebarContent from './component';
import LayoutContext from '../Layout/context';

const SidebarContentContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { sidebarContent } = output;

  if (sidebarContent.width === 0) return null;

  return <SidebarContent {...sidebarContent} />
}

export default LayoutContext.withConsumer(SidebarContentContainer);