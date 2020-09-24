import React from 'react';
import SideBarContent from './component';
import LayoutContext from '../Layout/context';

const SideBarContentContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { sideBarContent } = output;

  return <SideBarContent {...sideBarContent} />
}

export default LayoutContext.withConsumer(SideBarContentContainer);