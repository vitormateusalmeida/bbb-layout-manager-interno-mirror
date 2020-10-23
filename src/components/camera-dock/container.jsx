import React from 'react';
import CameraDock from './component';
import LayoutContext from '../Layout/context';

const CameraDockContainer = props => {
  const { contextState, contextDispatch } = props;
  const { input, output } = contextState;
  const { cameraDock } = output;

  if (cameraDock.width === 0) return null;

  return <CameraDock
    {...cameraDock}
    layoutType={input.layoutType}
    position={input.cameraDock.position}
    contextDispatch={contextDispatch}
  />
}

export default LayoutContext.withConsumer(CameraDockContainer);