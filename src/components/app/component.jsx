import React, { Component, Fragment } from 'react';
import NavBarContainer from '../nav-bar/container';
import SidebarNavigationContainer from '../sidebar-navigation/container';
import SidebarContentContainer from '../sidebar-content/container';
import CameraDockContainer from '../camera-dock/container';
import PresentationContainer from '../presentation/container';
import ActionBarContainer from '../action-bar/container';
import { LAYOUT_TYPE } from '../Layout/layout-manager/enum';
import DefaultLayout from '../Layout/layout-manager/defaultLayout';
import PresentationFocusLayout from '../Layout/layout-manager/presentationFocusLayout';
import VideoFocusLayout from '../Layout/layout-manager/videoFocusLayout';
import styles from './styles.module.sass';

export default class App extends Component {
  renderLayoutManager() {
    const { layoutType } = this.props;
    switch (layoutType) {
      case LAYOUT_TYPE.DEFAULT_LAYOUT:
        return <DefaultLayout />;
      case LAYOUT_TYPE.PRESENTATION_FOCUS:
        return <PresentationFocusLayout />
      case LAYOUT_TYPE.VIDEO_FOCUS:
        return <VideoFocusLayout />
      default:
        return <DefaultLayout />;
    }
  }
  render() {
    return (
      <Fragment>
        {this.renderLayoutManager()}
        <NavBarContainer />
        <SidebarNavigationContainer />
        <SidebarContentContainer />
        <CameraDockContainer />
        <PresentationContainer />
        <ActionBarContainer />
      </Fragment>
    );
  }
}