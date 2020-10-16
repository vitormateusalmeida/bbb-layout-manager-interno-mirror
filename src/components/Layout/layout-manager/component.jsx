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

  calculatesSideBarSize() {
    const { contextState } = this.props;
    const { input } = contextState;
    const {
      sideBarNavMinWidth,
      sideBarNavMaxWidth,
      sideBarContentMinWidth,
      sideBarContentMaxWidth,
    } = DEFAULT_VALUES;

    let sideBarNavigationBounds = {
      width: 0,
      height: 0,
    };
    let sideBarContentBounds = {
      width: 0,
      height: 0,
    };
    if (input.sideBarNavigation.isOpen) {
      if (input.sideBarNavigation.width === 0) {
        sideBarNavigationBounds.width = min(max((windowWidth() * 0.2), sideBarNavMinWidth), sideBarNavMaxWidth);
      } else {
        sideBarNavigationBounds.width = min(max(input.sideBarNavigation.width, sideBarNavMinWidth), sideBarNavMaxWidth);
      }
      sideBarNavigationBounds.height = windowHeight();
    } else {
      sideBarNavigationBounds.width = 0;
      sideBarNavigationBounds.height = 0;
    }
    if (input.sideBarContent.isOpen) {
      if (input.sideBarContent.width === 0) {
        sideBarContentBounds.width = min(max((windowWidth() * 0.2), sideBarContentMinWidth), sideBarContentMaxWidth);
      } else {
        sideBarContentBounds.width = min(max(input.sideBarContent.width, sideBarContentMinWidth), sideBarContentMaxWidth);
      }
      if (input.sideBarContent.height === 0) {
        if (input.cameraDock.position === CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM) {
          sideBarContentBounds.height = windowHeight() - (windowHeight() * 0.2);
        } else {
          sideBarContentBounds.height = windowHeight();
        }
      } else {
        sideBarContentBounds.height = input.sideBarContent.height;
      }
    } else {
      sideBarContentBounds.width = 0;
      sideBarContentBounds.height = 0;
    }

    return {
      sideBarNavigationBounds,
      sideBarContentBounds,
    }
  }

  calculatesCameraDockBounds(sideBarNavigationBounds, sideBarContentBounds) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let mediaAreaWidth = 0;
    if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen)
      mediaAreaWidth = windowWidth() - sideBarNavigationBounds.width;
    if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen)
      mediaAreaWidth = windowWidth() - sideBarContentBounds.width;
    if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen)
      mediaAreaWidth = windowWidth() - (sideBarNavigationBounds.width + sideBarContentBounds.width);
    let cameraDockBounds = {};

    if (input.cameraDock.numCameras > 0) {
      let cameraDockLeft = 0;
      let cameraDockHeight = 0;
      let cameraDockWidth = 0;
      switch (input.cameraDock.position) {
        case CAMERADOCK_POSITION.CONTENT_TOP:
          if (sideBarNavigationBounds.width > 0)
            cameraDockLeft += sideBarNavigationBounds.width;
          if (sideBarContentBounds.width > 0)
            cameraDockLeft += sideBarContentBounds.width;

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
            ? (sideBarNavigationBounds.width + sideBarContentBounds.width + mediaAreaWidth) - cameraDockWidth
            : sideBarNavigationBounds.width + sideBarContentBounds.width;
          cameraDockBounds.width = cameraDockWidth;
          cameraDockBounds.height = mediaAreaHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight;
          break;
        case CAMERADOCK_POSITION.CONTENT_BOTTOM:
          if (sideBarNavigationBounds.width > 0)
            cameraDockLeft += sideBarNavigationBounds.width;
          if (sideBarContentBounds.width > 0)
            cameraDockLeft += sideBarContentBounds.width;

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
          cameraDockBounds.left = sideBarNavigationBounds.width + sideBarContentBounds.width;
          cameraDockBounds.width = cameraDockWidth;
          cameraDockBounds.height = mediaAreaHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight;
          break;
        case CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM:
          cameraDockWidth = sideBarContentBounds.width;
          cameraDockBounds.top = sideBarContentBounds.height;
          cameraDockBounds.left = sideBarNavigationBounds.width;
          cameraDockBounds.width = sideBarContentBounds.width;
          cameraDockBounds.height = windowHeight() * 0.2;
          cameraDockBounds.maxHeight = windowHeight() * 0.2;
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

  calculatesPresentationBounds(sideBarNavigationBounds, sideBarContentBounds, cameraDockBounds) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    const mediaAreaWidth = windowWidth() - (sideBarNavigationBounds.width + sideBarContentBounds.width)
    let presentationBounds = {};

    if (input.cameraDock.numCameras > 0 && !input.cameraDock.isDragging) {
      switch (input.cameraDock.position) {
        case CAMERADOCK_POSITION.CONTENT_TOP:
          presentationBounds.width = mediaAreaWidth;
          presentationBounds.height = mediaAreaHeight - cameraDockBounds.height;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight + cameraDockBounds.height;
          presentationBounds.left = sideBarNavigationBounds.width + sideBarContentBounds.width;
          break;
        case CAMERADOCK_POSITION.CONTENT_RIGHT:
          presentationBounds.width = mediaAreaWidth - cameraDockBounds.width;
          presentationBounds.height = mediaAreaHeight;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavigationBounds.width + sideBarContentBounds.width;
          break;
        case CAMERADOCK_POSITION.CONTENT_BOTTOM:
          presentationBounds.width = mediaAreaWidth;
          presentationBounds.height = mediaAreaHeight - cameraDockBounds.height;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavigationBounds.width + sideBarContentBounds.width;
          break;
        case CAMERADOCK_POSITION.CONTENT_LEFT:
          presentationBounds.width = mediaAreaWidth - cameraDockBounds.width;
          presentationBounds.height = mediaAreaHeight;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavigationBounds.width
            + sideBarContentBounds.width
            + mediaAreaWidth - presentationBounds.width;
          break;
        case CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM:
          presentationBounds.width = mediaAreaWidth;
          presentationBounds.height = mediaAreaHeight;
          presentationBounds.top = DEFAULT_VALUES.navBarHeight;
          presentationBounds.left = sideBarNavigationBounds.width
            + sideBarContentBounds.width;
          break;
        default:
          console.log('presentation - camera default');
      }
    } else {
      presentationBounds.width = mediaAreaWidth;
      presentationBounds.height = mediaAreaHeight;
      presentationBounds.top = DEFAULT_VALUES.navBarHeight;
      presentationBounds.left = sideBarNavigationBounds.width
        + sideBarContentBounds.width;
    }

    return presentationBounds;
  }

  calculatesLayout() {
    const { contextState, contextDispatch } = this.props;
    const { input } = contextState;
    const { ACTIONS } = LayoutContext;
    const {
      sideBarNavigationBounds,
      sideBarContentBounds,
    } = this.calculatesSideBarSize();
    const cameraDockBounds = this.calculatesCameraDockBounds(
      sideBarNavigationBounds, sideBarContentBounds);
    const presentationBounds = this.calculatesPresentationBounds(
      sideBarNavigationBounds, sideBarContentBounds,
      cameraDockBounds);

    contextDispatch({
      type: ACTIONS.SET_MEDIA_AREA_SIZE,
      value: {
        width: windowWidth() - sideBarNavigationBounds.width - sideBarContentBounds.width,
        height: windowHeight() - DEFAULT_VALUES.navBarHeight - DEFAULT_VALUES.actionBarHeight,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_NAVBAR_OUTPUT,
      value: {
        display: input.navBar.hasNavBar,
        width: windowWidth() - sideBarNavigationBounds.width - sideBarContentBounds.width,
        height: DEFAULT_VALUES.navBarHeight,
        top: DEFAULT_VALUES.navBarTop,
        left: sideBarNavigationBounds.width + sideBarContentBounds.width,
        tabOrder: DEFAULT_VALUES.navBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_ACTIONBAR_OUTPUT,
      value: {
        display: input.actionBar.hasActionBar,
        width: windowWidth() - sideBarNavigationBounds.width - sideBarContentBounds.width,
        height: DEFAULT_VALUES.actionBarHeight,
        top: windowHeight() - DEFAULT_VALUES.actionBarHeight,
        left: sideBarNavigationBounds.width + sideBarContentBounds.width,
        tabOrder: DEFAULT_VALUES.actionBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_OUTPUT,
      value: {
        display: input.sideBarNavigation.isOpen,
        width: sideBarNavigationBounds.width,
        height: sideBarNavigationBounds.height,
        top: DEFAULT_VALUES.sideBarNavTop,
        left: DEFAULT_VALUES.sideBarNavLeft,
        tabOrder: DEFAULT_VALUES.sideBarNavTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_OUTPUT,
      value: {
        display: input.sideBarContent.isOpen,
        width: sideBarContentBounds.width,
        height: sideBarContentBounds.height,
        top: DEFAULT_VALUES.sideBarContentTop,
        left: sideBarNavigationBounds.width,
        currentPanelType: input.currentPanelType,
        tabOrder: DEFAULT_VALUES.sideBarContentTabOrder,
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

    // output: {
    //   screenShare: {
    //     display: false,
    //     width: 0,
    //     height: 0,
    //     top: 0,
    //     left: 0
    //   },
    //   externalVideo: {
    //     display: false,
    //     width: 0,
    //     height: 0,
    //     top: 0,
    //     left: 0,
    //     tabOrder: 0
    //   }
    // }
  }

  render() {
    return (
      <Fragment />
    );
  }
}

export default LayoutContext.withConsumer(LayoutManager);
