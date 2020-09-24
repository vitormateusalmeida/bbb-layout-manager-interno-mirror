import React from 'react';
import SideBarNavigation from './component';
import LayoutContext from '../Layout/context';

const CameraDockContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { cameraDock } = output;

  console.log('CameraDockContainer cameraDock', cameraDock);

  return <SideBarNavigation {...cameraDock} />
}

export default LayoutContext.withConsumer(CameraDockContainer);