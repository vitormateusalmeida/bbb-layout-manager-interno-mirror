import React from 'react';
import App from './component';
import LayoutContext from '../Layout/context';

const AppContainer = props => {
  const { contextState } = props;
  const { input } = contextState;
  const { layoutType } = input;

  return <App layoutType={layoutType} />
}

export default LayoutContext.withConsumer(AppContainer);