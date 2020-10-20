import React, { Component, Fragment } from 'react';
import LayoutContext from '../context';
import DEFAULT_VALUES, { CAMERADOCK_POSITION } from './defaultValues';
import _ from 'lodash';

const windowWidth = () => window.document.documentElement.clientWidth;
const windowHeight = () => window.document.documentElement.clientHeight;
const min = (value1, value2) => (value1 <= value2 ? value1 : value2);
const max = (value1, value2) => (value1 >= value2 ? value1 : value2);

const autoArrangeLayout = true;

class LayoutManager extends Component {
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

  calculatesSideBarContentHeight(cameraDockHeight) {
    const { contextState } = this.props;
    const { input } = contextState;
    let sideBarContentHeight = 0;
    if (input.sideBarContent.isOpen) {
      if (input.cameraDock.position === CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM) {
        sideBarContentHeight = windowHeight() - cameraDockHeight;
      } else {
        sideBarContentHeight = windowHeight();
      }
    } else {
      sideBarContentHeight = 0;
    }
    return sideBarContentHeight;
  }

  calculatesCameraDockBounds(sideBarNavWidth, sideBarContentWidth) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let mediaAreaWidth = 0;
    if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen)
      mediaAreaWidth = windowWidth() - sideBarNavWidth;
    if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen)
      mediaAreaWidth = windowWidth() - sideBarContentWidth;
    if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen)
      mediaAreaWidth = windowWidth() - (sideBarNavWidth + sideBarContentWidth);
    let cameraDockBounds = {};

    if (input.cameraDock.numCameras > 0) {
      let cameraDockLeft = 0;
      let cameraDockHeight = 0;
      let cameraDockWidth = 0;
      switch (input.cameraDock.position) {
        case CAMERADOCK_POSITION.CONTENT_TOP:
          if (sideBarNavWidth > 0)
            cameraDockLeft += sideBarNavWidth;
          if (sideBarContentWidth > 0)
            cameraDockLeft += sideBarContentWidth;

          if (input.cameraDock.height === 0) {
            if (input.presentation.isOpen) {
              cameraDockHeight = min(max((mediaAreaHeight * 0.2), DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
            } else {
              cameraDockHeight = mediaAreaHeight;
            }
          } else {
            cameraDockHeight = min(max(input.cameraDock.height, DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
          }

          cameraDockBounds.top = DEFAULT_VALUES.navBarHeight;
          cameraDockBounds.left = cameraDockLeft;
          cameraDockBounds.width = mediaAreaWidth;
          cameraDockBounds.height = cameraDockHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight;
          break;
        case CAMERADOCK_POSITION.CONTENT_RIGHT:
          if (input.cameraDock.width === 0) {
            if (input.presentation.isOpen) {
              cameraDockWidth = min(max((mediaAreaWidth * 0.2), DEFAULT_VALUES.cameraDockMinWidth), (mediaAreaWidth - DEFAULT_VALUES.cameraDockMinWidth));
            } else {
              cameraDockWidth = mediaAreaWidth;
            }
          } else {
            cameraDockWidth = min(max(input.cameraDock.width, DEFAULT_VALUES.cameraDockMinWidth), (mediaAreaWidth - DEFAULT_VALUES.cameraDockMinWidth));
          }

          cameraDockBounds.top = DEFAULT_VALUES.navBarHeight;
          cameraDockBounds.left = input.presentation.isOpen
            ? (sideBarNavWidth + sideBarContentWidth + mediaAreaWidth) - cameraDockWidth
            : sideBarNavWidth + sideBarContentWidth;
          cameraDockBounds.width = cameraDockWidth;
          cameraDockBounds.height = mediaAreaHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight;
          break;
        case CAMERADOCK_POSITION.CONTENT_BOTTOM:
          if (sideBarNavWidth > 0)
            cameraDockLeft += sideBarNavWidth;
          if (sideBarContentWidth > 0)
            cameraDockLeft += sideBarContentWidth;

          if (input.cameraDock.height === 0) {
            if (input.presentation.isOpen) {
              cameraDockHeight = min(max((mediaAreaHeight * 0.2), DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
            } else {
              cameraDockHeight = mediaAreaHeight;
            }
          } else {
            cameraDockHeight = min(max(input.cameraDock.height, DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
          }

          cameraDockBounds.top = DEFAULT_VALUES.navBarHeight + mediaAreaHeight - cameraDockHeight;
          cameraDockBounds.left = cameraDockLeft;
          cameraDockBounds.width = mediaAreaWidth;
          cameraDockBounds.height = cameraDockHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight;
          break;
        case CAMERADOCK_POSITION.CONTENT_LEFT:
          if (input.cameraDock.width === 0) {
            if (input.presentation.isOpen) {
              cameraDockWidth = min(max((mediaAreaWidth * 0.2), DEFAULT_VALUES.cameraDockMinWidth), (mediaAreaWidth - DEFAULT_VALUES.cameraDockMinWidth));
            } else {
              cameraDockWidth = mediaAreaWidth;
            }
          } else {
            cameraDockWidth = min(max(input.cameraDock.width, DEFAULT_VALUES.cameraDockMinWidth), (mediaAreaWidth - DEFAULT_VALUES.cameraDockMinWidth));
          }

          cameraDockBounds.top = DEFAULT_VALUES.navBarHeight;
          cameraDockBounds.left = sideBarNavWidth + sideBarContentWidth;
          cameraDockBounds.width = cameraDockWidth;
          cameraDockBounds.height = mediaAreaHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight;
          break;
        case CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM:
          if (input.cameraDock.height === 0) {
            cameraDockHeight = min(max((windowHeight() * 0.2), DEFAULT_VALUES.cameraDockMinHeight), (windowHeight() - DEFAULT_VALUES.cameraDockMinHeight));
          } else {
            cameraDockHeight = min(max(input.cameraDock.height, DEFAULT_VALUES.cameraDockMinHeight), (windowHeight() - DEFAULT_VALUES.cameraDockMinHeight));
          }

          cameraDockBounds.top = windowHeight() - cameraDockHeight;
          cameraDockBounds.left = sideBarNavWidth;
          cameraDockBounds.width = sideBarContentWidth;
          cameraDockBounds.height = cameraDockHeight;
          cameraDockBounds.maxHeight = windowHeight() * 0.8;
          break;
        default:
          console.log('default');
      }
    } else {
      cameraDockBounds.width = 0;
      cameraDockBounds.height = 0;
    }

    return cameraDockBounds;
  }

  calculatesPresentationBounds(sideBarNavWidth, sideBarContentWidth, cameraDockBounds) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    const mediaAreaWidth = windowWidth() - (sideBarNavWidth + sideBarContentWidth)
    let presentationBounds = {};

    if (input.cameraDock.numCameras > 0 && !input.cameraDock.isDragging) {
      switch (input.cameraDock.position) {
        case CAMERADOCK_POSITION.CONTENT_TOP:
          presentationBounds.width = mediaAreaWidth;
          presentationBounds.height = mediaAreaHeight - cameraDockBounds.height;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight + cameraDockBounds.height;
          presentationBounds.left = sideBarNavWidth + sideBarContentWidth;
          break;
        case CAMERADOCK_POSITION.CONTENT_RIGHT:
          presentationBounds.width = mediaAreaWidth - cameraDockBounds.width;
          presentationBounds.height = mediaAreaHeight;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavWidth + sideBarContentWidth;
          break;
        case CAMERADOCK_POSITION.CONTENT_BOTTOM:
          presentationBounds.width = mediaAreaWidth;
          presentationBounds.height = mediaAreaHeight - cameraDockBounds.height;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavWidth + sideBarContentWidth;
          break;
        case CAMERADOCK_POSITION.CONTENT_LEFT:
          presentationBounds.width = mediaAreaWidth - cameraDockBounds.width;
          presentationBounds.height = mediaAreaHeight;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavWidth
            + sideBarContentWidth + mediaAreaWidth - presentationBounds.width;
          break;
        case CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM:
          presentationBounds.width = mediaAreaWidth;
          presentationBounds.height = mediaAreaHeight;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavWidth + sideBarContentWidth;
          break;
        default:
          console.log('presentation - camera default');
      }
    } else {
      presentationBounds.width = mediaAreaWidth;
      presentationBounds.height = mediaAreaHeight;
      presentationBounds.top = DEFAULT_VALUES.navBarHeight;
      presentationBounds.left = sideBarNavWidth + sideBarContentWidth;
    }

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
    const sideBarContentHeight = this.calculatesSideBarContentHeight(cameraDockBounds.height);
    const presentationBounds = this.calculatesPresentationBounds(sideBarNavWidth, sideBarContentWidth, cameraDockBounds);

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

export default LayoutContext.withConsumer(LayoutManager);
