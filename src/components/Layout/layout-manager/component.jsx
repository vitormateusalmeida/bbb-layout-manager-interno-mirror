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

  calculatesCameraDockSize(sideBarNavigationSize, sideBarContentSize) {
    const { contextState } = this.props;
    const { input } = contextState;
    const mediaAreaHeight = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let cameraDockSize = {};

    if (input.cameraDock.numCameras > 0) {
      if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen) {
        cameraDockSize.width = windowWidth() - sideBarNavigationSize;
      }
      if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen) {
        cameraDockSize.width = windowWidth() - sideBarContentSize;
      }
      if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen) {
        cameraDockSize.width = windowWidth() - (sideBarNavigationSize + sideBarContentSize);
      }
  
      if (input.cameraDock.height === 0){
        if (input.presentation.isOpen) {
          cameraDockSize.height = min(max((mediaAreaHeight * 0.2), DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
        } else {
          cameraDockSize.height = mediaAreaHeight;
        }
      } else {
        cameraDockSize.height = min(max(input.cameraDock.height, DEFAULT_VALUES.cameraDockMinHeight), (mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight));
      }
    } else {
      cameraDockSize.width = 0;
      cameraDockSize.height = 0;
    }

    cameraDockSize.maxHeight = mediaAreaHeight - DEFAULT_VALUES.cameraDockMinHeight;

    return cameraDockSize;
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
    
    if (input.cameraDock.numCameras > 0) {
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
    const cameraDockSize = this.calculatesCameraDockSize(
      sideBarNavigationSize.width, sideBarContentSize.width);
    const presentationSize = this.calculatesPresentationSize(
      sideBarNavigationSize, sideBarContentSize,
      cameraDockSize);

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
        top: DEFAULT_VALUES.navBarHeight + cameraDockSize.height + presentationSize.height,
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

    contextDispatch({
      type: ACTIONS.SET_CAMERA_DOCK_OUTPUT,
      value: {
        display: input.cameraDock.numCameras > 0,
        width: cameraDockSize.width,
        maxHeight: cameraDockSize.maxHeight,
        height: cameraDockSize.height,
        top: DEFAULT_VALUES.cameraPosition === 'top' ? DEFAULT_VALUES.navBarHeight : 0, // fazer função para calcular a posição
        left: sideBarNavigationSize.width + sideBarContentSize.width,
        tabOrder: 4,
      }
    });

    contextDispatch({
      type: ACTIONS.SET_PRESENTATION_OUTPUT,
      value: {
        display: input.presentation.isOpen,
        width: presentationSize.width,
        height: presentationSize.height,
        top: DEFAULT_VALUES.cameraPosition === 'top' ? DEFAULT_VALUES.navBarHeight + cameraDockSize.height : 0, // fazer função para calcular a posição
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
