import React from 'react';
import ActionBar from './component';
import LayoutContext from '../Layout/context';

const ActionBarContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { actionBar } = output;

  return <ActionBar {...actionBar} />
}

export default LayoutContext.withConsumer(ActionBarContainer);