import React, { Component, Fragment } from 'react';
import NavBar from '../nav-bar/component';
import SideBarNavigation from '../side-bar-navigation/component';
import SideBarContent from '../side-bar-content/component';
import CameraDock from '../camera-dock/component';
import Presentation from '../presentation/component';
import ActionBar from '../action-bar/component';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <SideBarNavigation />
        <SideBarContent />
        <CameraDock />
        <Presentation />
        <ActionBar />
      </Fragment>
    );
  }
}