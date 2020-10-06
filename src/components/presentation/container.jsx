import React from 'react';
import Presentation from './component';
import LayoutContext from '../Layout/context';

const PresentationContainer = props => {
  const { contextState } = props;
  const { output } = contextState;
  const { presentation } = output;

  if (presentation.width === 0) return null;

  return <Presentation {...presentation} />
}

export default LayoutContext.withConsumer(PresentationContainer);