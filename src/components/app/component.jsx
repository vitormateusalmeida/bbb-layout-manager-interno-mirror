import React, { Component, Fragment } from 'react';
import NavBarContainer from '../nav-bar/container';
import SideBarNavigationContainer from '../side-bar-navigation/container';
import SideBarContentContainer from '../side-bar-content/container';
import CameraDockContainer from '../camera-dock/container';
import PresentationContainer from '../presentation/container';
import ActionBarContainer from '../action-bar/container';
import LayoutManager from '../Layout/layout-manager/component'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <LayoutManager />
        <NavBarContainer />
        <SideBarNavigationContainer />
        <SideBarContentContainer />
        <CameraDockContainer />
        <PresentationContainer />
        <ActionBarContainer />
      </Fragment>
    );
  }
}