import React, { Component, Fragment } from 'react';
import AppContainer from '../components/app/container';
import LayoutContext from '../components/Layout/context';

class Base extends Component {
  render() {
    return (
      <Fragment>
        <AppContainer />
      </Fragment>
    );
  }
}

export default LayoutContext.withProvider(Base);
