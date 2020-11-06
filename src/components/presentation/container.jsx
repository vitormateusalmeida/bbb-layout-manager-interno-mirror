import React from 'react';
import Presentation from './component';
import LayoutContext from '../Layout/context';

const PresentationContainer = props => {
  const { contextState, contextDispatch } = props;
  const { input, output } = contextState;
  const { presentation } = output;

  console.log('presentation', presentation);

  if (presentation.width === 0) return null;

  return <Presentation
    {...presentation}
    layoutType={input.layoutType}
    contextDispatch={contextDispatch}
  />
}

export default LayoutContext.withConsumer(PresentationContainer);