import React from 'react';
import SideBarContent from './component';
import LayoutContext from '../Layout/context';

const SideBarContentContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { sideBarContent } = output;

  if (sideBarContent.width === 0) return null;

  return <SideBarContent {...sideBarContent} />
}

export default LayoutContext.withConsumer(SideBarContentContainer);