import React, { Component, Fragment } from 'react';
import App from '../components/app/component';
import LayoutContext from '../components/Layout/context';

class Base extends Component {
  render() {
    return (
      <Fragment>
        <App />
      </Fragment>
    );
  }
}

export default LayoutContext.withProvider(Base);
