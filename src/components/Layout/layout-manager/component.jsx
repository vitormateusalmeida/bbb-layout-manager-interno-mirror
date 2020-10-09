import React, { Component, Fragment } from 'react';
import LayoutContext from '../context';
import DEFAULT_VALUES from './defaultValues';
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

    let sideBarNavigationSize;
    let sideBarContentSize;
    if (input.sideBarNavigation.isOpen) {
      if (input.sideBarNavigation.width === 0) {
        sideBarNavigationSize = {
          width: min(max((windowWidth() * 0.2), sideBarNavMinWidth), sideBarNavMaxWidth),
        }
      } else {
        sideBarNavigationSize = {
          width: min(max(input.sideBarNavigation.width, sideBarNavMinWidth), sideBarNavMaxWidth),
        }
      }
    }
    if (input.sideBarContent.isOpen) {
      if (input.sideBarContent.width === 0) {
        sideBarContentSize = {
          width: min(max((windowWidth() * 0.2), sideBarContentMinWidth), sideBarContentMaxWidth),
        }
      } else {
        sideBarContentSize = {
          width: min(max(input.sideBarContent.width, sideBarContentMinWidth), sideBarContentMaxWidth),
        }
      }
    }

    return {
      sideBarNavigationSize,
      sideBarContentSize
    }
  }

  calculatesCameraDockBounds(sideBarNavigationSize, sideBarContentSize) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let mediaAreaWidth = 0;
    if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen)
      mediaAreaWidth = windowWidth() - sideBarNavigationSize.width;
    if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen)
      mediaAreaWidth = windowWidth() - sideBarContentSize.width;
    if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen)
      mediaAreaWidth = windowWidth() - (sideBarNavigationSize.width + sideBarContentSize.width);
    let cameraDockBounds = {};

    if (input.cameraDock.numCameras > 0) {
      let cameraDockLeft = 0;
      let cameraDockHeight = 0;
      let cameraDockWidth = 0;
      switch (input.cameraDock.position) {
        case 'top':
          console.log('position top');

          if (sideBarNavigationSize.width > 0)
            cameraDockLeft += sideBarNavigationSize.width;
          if (sideBarContentSize.width > 0)
            cameraDockLeft += sideBarContentSize.width;

          if (input.cameraDock.height === 0) {
            if (input.presentation.isOpen) {
              cameraDockHeight = min(max((mediaAreaHeight * 0.2), DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
            } else {
              cameraDockHeight = mediaAreaHeight;
            }
          } else {
            cameraDockHeight = min(max(input.cameraDock.height, DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
          }

          cameraDockBounds.top = DEFAULT_VALUES.navBarHeight
          cameraDockBounds.left = cameraDockLeft;
          cameraDockBounds.width = mediaAreaWidth;
          cameraDockBounds.height = cameraDockHeight;
          cameraDockBounds.maxHeight = mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight;
          break;
        case 'right':
          console.log('position right');

          break;
        case 'bottom':
          console.log('position bottom');
          break;
        case 'left':
          console.log('position left');
          if (sideBarNavigationSize.width > 0)
            cameraDockLeft += sideBarNavigationSize.width;
          if (sideBarContentSize.width > 0)
            cameraDockLeft += sideBarContentSize.width;

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
          cameraDockBounds.left = cameraDockLeft;
          cameraDockBounds.width = cameraDockWidth;
          cameraDockBounds.height = mediaAreaHeight;
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

  calculatesPresentationSize(sideBarNavigationSize, sideBarContentSize, cameraDockSize) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let presentationSize = {};

    if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen) {
      presentationSize.width = windowWidth() - sideBarNavigationSize.width;
    }
    if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen) {
      presentationSize.width = windowWidth() - sideBarContentSize.width;
    }
    if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen) {
      presentationSize.width = windowWidth() - (sideBarNavigationSize.width + sideBarContentSize.width);
    }

    if (input.cameraDock.numCameras > 0 && !input.cameraDock.isDragging) {
      presentationSize.height = min(max(mediaAreaHeight - cameraDockSize.height, DEFAULT_VALUES.presentationMinHeight), (mediaAreaHeight - DEFAULT_VALUES.presentationMinHeight));
    } else {
      presentationSize.height = mediaAreaHeight;
    }

    return presentationSize;
  }

  calculatesLayout() {
    const { contextState, contextDispatch } = this.props;
    const { input } = contextState;
    const { ACTIONS } = LayoutContext;
    const {
      sideBarNavigationSize,
      sideBarContentSize,
    } = this.calculatesSideBarSize();
    const cameraDockBounds = this.calculatesCameraDockBounds(
      sideBarNavigationSize, sideBarContentSize);
    const presentationSize = this.calculatesPresentationSize(
      sideBarNavigationSize, sideBarContentSize,
      cameraDockBounds);

    contextDispatch({
      type: ACTIONS.SET_NAVBAR_OUTPUT,
      value: {
        display: input.navBar.hasNavBar,
        width: windowWidth() - sideBarNavigationSize.width - sideBarContentSize.width,
        height: DEFAULT_VALUES.navBarHeight,
        top: DEFAULT_VALUES.navBarTop,
        left: sideBarNavigationSize.width + sideBarContentSize.width,
        tabOrder: DEFAULT_VALUES.navBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_ACTIONBAR_OUTPUT,
      value: {
        display: input.actionBar.hasActionBar,
        width: windowWidth() - sideBarNavigationSize.width - sideBarContentSize.width,
        height: DEFAULT_VALUES.actionBarHeight,
        top: windowHeight() - DEFAULT_VALUES.actionBarHeight,
        left: sideBarNavigationSize.width + sideBarContentSize.width,
        tabOrder: DEFAULT_VALUES.actionBarTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_OUTPUT,
      value: {
        display: input.sideBarNavigation.isOpen,
        width: sideBarNavigationSize.width,
        height: DEFAULT_VALUES.sideBarNavHeight,
        top: DEFAULT_VALUES.sideBarNavTop,
        left: DEFAULT_VALUES.sideBarNavLeft,
        tabOrder: DEFAULT_VALUES.sideBarNavTabOrder,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_OUTPUT,
      value: {
        display: input.sideBarContent.isOpen,
        width: sideBarContentSize.width,
        height: DEFAULT_VALUES.sideBarContentHeight,
        top: DEFAULT_VALUES.sideBarContentTop,
        left: sideBarNavigationSize.width,
        currentPanelType: input.currentPanelType,
        tabOrder: DEFAULT_VALUES.sideBarContentTabOrder,
      }
    });
console.log('---- cameraDockBounds', cameraDockBounds);
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
        width: presentationSize.width,
        height: presentationSize.height,
        top: DEFAULT_VALUES.cameraPosition === 'top' && !input.cameraDock.isDragging ? DEFAULT_VALUES.navBarHeight + cameraDockBounds.height : DEFAULT_VALUES.navBarHeight, // fazer função para calcular a posição
        left: sideBarNavigationSize.width + sideBarContentSize.width,
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
