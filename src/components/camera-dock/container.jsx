import React from 'react';
import CameraDock from './component';
import LayoutContext from '../Layout/context';

const CameraDockContainer = props => {
  const { contextState, contextDispatch } = props;
  const { output } = contextState;
  const { cameraDock } = output;

  if (cameraDock.width === 0) return null;

  return <CameraDock {...cameraDock} contextDispatch={contextDispatch} />
}

export default LayoutContext.withConsumer(CameraDockContainer);