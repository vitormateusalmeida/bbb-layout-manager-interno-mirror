import React, { Component, Fragment } from 'react';
import LayoutContext from '../context';
import DEFAULT_VALUES from './defaultValues';
import { LAYOUT_TYPE, CAMERADOCK_POSITION } from './enum';
import _ from 'lodash';

const windowWidth = () => window.document.documentElement.clientWidth;
const windowHeight = () => window.document.documentElement.clientHeight;
const min = (value1, value2) => (value1 <= value2 ? value1 : value2);
const max = (value1, value2) => (value1 >= value2 ? value1 : value2);

const autoArrangeLayout = true;

class VideoFocusLayout extends Component {
  constructor(props) {
    super(props);

    this.throttledCalculatesLayout = _.throttle(() => this.calculatesLayout(),
      50, { 'trailing': true, 'leading': true });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.contextState.input !== nextProps.contextState.input;
  }

  componentDidMount() {
    this.calculatesLayout();
    const { ACTIONS } = LayoutContext;
    const { contextDispatch } = this.props;
    window.addEventListener('resize', () => {
      contextDispatch({
        type: ACTIONS.SET_BROWSER_SIZE,
        value: {
          width: window.document.documentElement.clientWidth,
          height: window.document.documentElement.clientHeight,
        }
      });
    });
  }

  componentDidUpdate() {
    this.throttledCalculatesLayout();
  }

  calculatesSideBarNavWidth() {
    const { contextState } = this.props;
    const { input } = contextState;
    const {
      sideBarNavMinWidth,
      sideBarNavMaxWidth,
    } = DEFAULT_VALUES;
    let sideBarNavWidth = 0;
    if (input.sideBarNavigation.isOpen) {
      if (input.sideBarNavigation.width === 0) {
        sideBarNavWidth = min(max((windowWidth() * 0.2), sideBarNavMinWidth), sideBarNavMaxWidth);
      } else {
        sideBarNavWidth = min(max(input.sideBarNavigation.width, sideBarNavMinWidth), sideBarNavMaxWidth);
      }
    } else {
      sideBarNavWidth = 0;
    }
    return sideBarNavWidth;
  }

  calculatesSideBarNavHeight() {
    const { contextState } = this.props;
    const { input } = contextState;
    let sideBarNavHeight = 0;
    if (input.sideBarNavigation.isOpen) {
      sideBarNavHeight = windowHeight();
    } else {
      sideBarNavHeight = 0;
    }
    return sideBarNavHeight;
  }

  calculatesSideBarContentWidth() {
    const { contextState } = this.props;
    const { input } = contextState;
    const {
      sideBarContentMinWidth,
      sideBarContentMaxWidth,
    } = DEFAULT_VALUES;
    let sideBarContentWidth = 0;
    if (input.sideBarContent.isOpen) {
      if (input.sideBarContent.width === 0) {
        sideBarContentWidth = min(max((windowWidth() * 0.2), sideBarContentMinWidth), sideBarContentMaxWidth);
      } else {
        sideBarContentWidth = min(max(input.sideBarContent.width, sideBarContentMinWidth), sideBarContentMaxWidth);
      }
    } else {
      sideBarContentWidth = 0;
    }
    return sideBarContentWidth;
  }

  calculatesSideBarContentHeight(presentationHeight) {
    const { contextState } = this.props;
    const { input } = contextState;
    let sideBarContentHeight = 0;
    if (input.sideBarContent.isOpen) {
      if (input.cameraDock.position === CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM
        || input.layoutType === LAYOUT_TYPE.VIDEO_FOCUS) {
        sideBarContentHeight = windowHeight() - presentationHeight;
      } else {
        sideBarContentHeight = windowHeight();
      }
    } else {
      sideBarContentHeight = 0;
    }
    return sideBarContentHeight;
  }

  calculatesCameraDockBounds(sideBarNavWidth, sideBarContentWidth) {
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    const mediaAreaWidth = windowWidth() - (sideBarNavWidth + sideBarContentWidth);
    let cameraDockBounds = {};
    cameraDockBounds.top = DEFAULT_VALUES.navBarHeight;
    cameraDockBounds.left = sideBarNavWidth + sideBarContentWidth;
    cameraDockBounds.width = mediaAreaWidth;
    cameraDockBounds.height = mediaAreaHeight;
    return cameraDockBounds;
  }

  calculatesPresentationBounds(sideBarNavWidth, sideBarContentWidth) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    const mediaAreaWidth = windowWidth() - (sideBarNavWidth + sideBarContentWidth);
    let presentationBounds = {};
    let presentationHeight = 0;
    if (input.presentation.height === 0
      || input.layoutType === LAYOUT_TYPE.VIDEO_FOCUS) {
      presentationHeight = min(max((windowHeight() * 0.2), DEFAULT_VALUES.presentationMinHeight), (windowHeight() - DEFAULT_VALUES.presentationMinHeight));
    } else {
      presentationHeight = min(max(input.presentation.height, DEFAULT_VALUES.presentationMinHeight), (windowHeight() - DEFAULT_VALUES.presentationMinHeight));
    }
    presentationBounds.top = windowHeight() - presentationHeight;
    presentationBounds.left = sideBarNavWidth;
    presentationBounds.width = sideBarContentWidth;
    presentationBounds.height = presentationHeight;
    return presentationBounds;
  }

  calculatesLayout() {
    const { contextState, contextDispatch } = this.props;
    const { input } = contextState;
    const { ACTIONS } = LayoutContext;

    const sideBarNavWidth = this.calculatesSideBarNavWidth();
    const sideBarContentWidth = this.calculatesSideBarContentWidth();
    const cameraDockBounds = this.calculatesCameraDockBounds(sideBarNavWidth, sideBarContentWidth);
    const sideBarNavHeight = this.calculatesSideBarNavHeight();
    const presentationBounds = this.calculatesPresentationBounds(sideBarNavWidth, sideBarContentWidth);
    const sideBarContentHeight = this.calculatesSideBarContentHeight(presentationBounds.height);

    contextDispatch({
      type: ACTIONS.SET_NAVBAR_OUTPUT,
      value: {
        display: input.navBar.hasNavBar,
        width: windowWidth() - sideBarNavWidth - sideBarContentWidth,
        height: DEFAULT_VALUES.navBarHeight,
        top: DEFAULT_VALUES.navBarTop,
        left: sideBarNavWidth + sideBarContentWidth,
        tabOrder: DEFAULT_VALUES.navBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_ACTIONBAR_OUTPUT,
      value: {
        display: input.actionBar.hasActionBar,
        width: windowWidth() - sideBarNavWidth - sideBarContentWidth,
        height: DEFAULT_VALUES.actionBarHeight,
        top: windowHeight() - DEFAULT_VALUES.actionBarHeight,
        left: sideBarNavWidth + sideBarContentWidth,
        tabOrder: DEFAULT_VALUES.actionBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_OUTPUT,
      value: {
        display: input.sideBarNavigation.isOpen,
        width: sideBarNavWidth,
        height: sideBarNavHeight,
        top: DEFAULT_VALUES.sideBarNavTop,
        left: DEFAULT_VALUES.sideBarNavLeft,
        tabOrder: DEFAULT_VALUES.sideBarNavTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_OUTPUT,
      value: {
        display: input.sideBarContent.isOpen,
        width: sideBarContentWidth,
        height: sideBarContentHeight,
        top: DEFAULT_VALUES.sideBarContentTop,
        left: sideBarNavWidth,
        currentPanelType: input.currentPanelType,
        tabOrder: DEFAULT_VALUES.sideBarContentTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_MEDIA_AREA_SIZE,
      value: {
        width: windowWidth() - sideBarNavWidth - sideBarContentWidth,
        height: windowHeight() - DEFAULT_VALUES.navBarHeight - DEFAULT_VALUES.actionBarHeight,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_CAMERA_DOCK_OUTPUT,
      value: {
        display: input.cameraDock.numCameras > 0,
        width: cameraDockBounds.width,
        maxHeight: cameraDockBounds.maxHeight,
        height: cameraDockBounds.height,
        top: cameraDockBounds.top,
        left: cameraDockBounds.left,
        tabOrder: 4,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_PRESENTATION_OUTPUT,
      value: {
        display: input.presentation.isOpen,
        width: presentationBounds.width,
        height: presentationBounds.height,
        top: presentationBounds.top,
        left: presentationBounds.left,
        tabOrder: DEFAULT_VALUES.presentationTabOrder,
      }
    });
  }

  render() {
    return (
      <Fragment />
    );
  }
}

export default LayoutContext.withConsumer(VideoFocusLayout);
