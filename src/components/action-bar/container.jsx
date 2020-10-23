import React from 'react';
import ActionBar from './component';
import LayoutContext from '../Layout/context';

const ActionBarContainer = props => {
  const { contextState, contextDispatch } = props;
  const { output } = contextState;
  const { actionBar } = output;

  if (actionBar.width === 0) return null;

  return <ActionBar {...actionBar} contextDispatch={contextDispatch}/>
}

export default LayoutContext.withConsumer(ActionBarContainer);