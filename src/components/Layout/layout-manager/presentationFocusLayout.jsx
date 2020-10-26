import React, { Component, Fragment } from 'react';
import LayoutContext from '../context';
import DEFAULT_VALUES from './defaultValues';
import { CAMERADOCK_POSITION, LAYOUT_TYPE } from './enums';
import _ from 'lodash';

const windowWidth = () => window.document.documentElement.clientWidth;
const windowHeight = () => window.document.documentElement.clientHeight;
const min = (value1, value2) => (value1 <= value2 ? value1 : value2);
const max = (value1, value2) => (value1 >= value2 ? value1 : value2);

const autoArrangeLayout = true;

class PresentationFocusLayout extends Component {
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

  calculatesSidebarNavWidth() {
    const { contextState } = this.props;
    const { input } = contextState;
    const {
      sidebarNavMinWidth,
      sidebarNavMaxWidth,
    } = DEFAULT_VALUES;
    let sidebarNavWidth = 0;
    if (input.sidebarNavigation.isOpen) {
      if (input.sidebarNavigation.width === 0) {
        sidebarNavWidth = min(max((windowWidth() * 0.2), sidebarNavMinWidth), sidebarNavMaxWidth);
      } else {
        sidebarNavWidth = min(max(input.sidebarNavigation.width, sidebarNavMinWidth), sidebarNavMaxWidth);
      }
    } else {
      sidebarNavWidth = 0;
    }
    return sidebarNavWidth;
  }

  calculatesSidebarNavHeight() {
    const { contextState } = this.props;
    const { input } = contextState;
    let sidebarNavHeight = 0;
    if (input.sidebarNavigation.isOpen) {
      sidebarNavHeight = windowHeight();
    } else {
      sidebarNavHeight = 0;
    }
    return sidebarNavHeight;
  }

  calculatesSidebarContentWidth() {
    const { contextState } = this.props;
    const { input } = contextState;
    const {
      sidebarContentMinWidth,
      sidebarContentMaxWidth,
    } = DEFAULT_VALUES;
    let sidebarContentWidth = 0;
    if (input.sidebarContent.isOpen) {
      if (input.sidebarContent.width === 0) {
        sidebarContentWidth = min(max((windowWidth() * 0.2), sidebarContentMinWidth), sidebarContentMaxWidth);
      } else {
        sidebarContentWidth = min(max(input.sidebarContent.width, sidebarContentMinWidth), sidebarContentMaxWidth);
      }
    } else {
      sidebarContentWidth = 0;
    }
    return sidebarContentWidth;
  }

  calculatesSidebarContentHeight(cameraDockHeight) {
    const { contextState } = this.props;
    const { input } = contextState;
    let sidebarContentHeight = 0;
    if (input.sidebarContent.isOpen) {
      if ((input.cameraDock.numCameras > 0
        && input.cameraDock.position === CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM)
        || (input.cameraDock.numCameras > 0 && input.layoutType === LAYOUT_TYPE.PRESENTATION_FOCUS)) {
        sidebarContentHeight = windowHeight() - cameraDockHeight;
      } else {
        sidebarContentHeight = windowHeight();
      }
    } else {
      sidebarContentHeight = 0;
    }
    return sidebarContentHeight;
  }

  calculatesCameraDockBounds(sidebarNavWidth, sidebarContentWidth) {
    const { contextState } = this.props;
    const { input } = contextState;
    let cameraDockBounds = {};

    if (input.cameraDock.numCameras > 0) {
      let cameraDockHeight = 0;
      if (input.cameraDock.height === 0) {
        cameraDockHeight = min(max((windowHeight() * 0.2), DEFAULT_VALUES.cameraDockMinHeight), (windowHeight() - DEFAULT_VALUES.cameraDockMinHeight));
      } else {
        cameraDockHeight = min(max(input.cameraDock.height, DEFAULT_VALUES.cameraDockMinHeight), (windowHeight() - DEFAULT_VALUES.cameraDockMinHeight));
      }
      cameraDockBounds.top = windowHeight() - cameraDockHeight;
      cameraDockBounds.left = sidebarNavWidth;
      cameraDockBounds.width = sidebarContentWidth;
      cameraDockBounds.height = cameraDockHeight;
      cameraDockBounds.maxHeight = windowHeight() * 0.8;
    } else {
      cameraDockBounds.width = 0;
      cameraDockBounds.height = 0;
    }
    return cameraDockBounds;
  }

  calculatesPresentationBounds(sidebarNavWidth, sidebarContentWidth) {
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    const mediaAreaWidth = windowWidth() - (sidebarNavWidth + sidebarContentWidth)
    let presentationBounds = {};
    presentationBounds.width = mediaAreaWidth;
    presentationBounds.height = mediaAreaHeight;
    presentationBounds.top = DEFAULT_VALUES.navBarHeight;
    presentationBounds.left = sidebarNavWidth + sidebarContentWidth;
    return presentationBounds;
  }

  calculatesLayout() {
    const { contextState, contextDispatch } = this.props;
    const { input } = contextState;
    const { ACTIONS } = LayoutContext;

    const sidebarNavWidth = this.calculatesSidebarNavWidth();
    const sidebarContentWidth = this.calculatesSidebarContentWidth();
    const cameraDockBounds = this.calculatesCameraDockBounds(sidebarNavWidth, sidebarContentWidth);
    const sidebarNavHeight = this.calculatesSidebarNavHeight();
    const sidebarContentHeight = this.calculatesSidebarContentHeight(cameraDockBounds.height);
    const presentationBounds = this.calculatesPresentationBounds(sidebarNavWidth, sidebarContentWidth);

    contextDispatch({
      type: ACTIONS.SET_NAVBAR_OUTPUT,
      value: {
        display: input.navBar.hasNavBar,
        width: windowWidth() - sidebarNavWidth - sidebarContentWidth,
        height: DEFAULT_VALUES.navBarHeight,
        top: DEFAULT_VALUES.navBarTop,
        left: sidebarNavWidth + sidebarContentWidth,
        tabOrder: DEFAULT_VALUES.navBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_ACTIONBAR_OUTPUT,
      value: {
        display: input.actionBar.hasActionBar,
        width: windowWidth() - sidebarNavWidth - sidebarContentWidth,
        height: DEFAULT_VALUES.actionBarHeight,
        top: windowHeight() - DEFAULT_VALUES.actionBarHeight,
        left: sidebarNavWidth + sidebarContentWidth,
        tabOrder: DEFAULT_VALUES.actionBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_OUTPUT,
      value: {
        display: input.sidebarNavigation.isOpen,
        width: sidebarNavWidth,
        height: sidebarNavHeight,
        top: DEFAULT_VALUES.sidebarNavTop,
        left: DEFAULT_VALUES.sidebarNavLeft,
        tabOrder: DEFAULT_VALUES.sidebarNavTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_OUTPUT,
      value: {
        display: input.sidebarContent.isOpen,
        width: sidebarContentWidth,
        height: sidebarContentHeight,
        top: DEFAULT_VALUES.sidebarContentTop,
        left: sidebarNavWidth,
        currentPanelType: input.currentPanelType,
        tabOrder: DEFAULT_VALUES.sidebarContentTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_MEDIA_AREA_SIZE,
      value: {
        width: windowWidth() - sidebarNavWidth - sidebarContentWidth,
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

export default LayoutContext.withConsumer(PresentationFocusLayout);
