import React, { Component, Fragment } from 'react';
import LayoutContext from '../context';
import _ from 'lodash';

const windowWidth = () => window.innerWidth;
const windowHeight = () => window.innerHeight;
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
          width: window.innerWidth,
          height: window.innerHeight,
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
    } = LayoutContext.DEFAULT_VALUES;

    let sideBarNavigationSize;
    let sideBarContentSize;
    if (input.sideBarNavigation.isOpen) {
      if (input.sideBarNavigation.width === 0 || autoArrangeLayout) {
        sideBarNavigationSize = {
          width: min(max((windowWidth() * 0.2), sideBarNavMinWidth), sideBarNavMaxWidth),
        }
      } else {
        sideBarNavigationSize = {
          width: input.sideBarNavigation.width,
        }
      }
    }
    if (input.sideBarContent.isOpen) {
      if (input.sideBarContent.width === 0 || autoArrangeLayout) {
        sideBarContentSize = {
          width: min(max((windowWidth() * 0.2), sideBarContentMinWidth), sideBarContentMaxWidth),
        }
      } else {
        sideBarContentSize = {
          width: input.sideBarContent.width,
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
    const { DEFAULT_VALUES } = LayoutContext;
    const mediaArea = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let cameraDockSize = {};

    if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen) {
      cameraDockSize.width = windowWidth() - sideBarNavigationSize;
    }
    if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen) {
      cameraDockSize.width = windowWidth() - sideBarContentSize;
    }
    if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen) {
      cameraDockSize.width = windowWidth() - (sideBarNavigationSize + sideBarContentSize);
    }

    if (autoArrangeLayout) {
      cameraDockSize.height = min(max((mediaArea * 0.2), (mediaArea * 0.2)), (mediaArea * 0.8));
    }

    return cameraDockSize;
  }

  calculatesPresentationSize(sideBarNavigationSize, sideBarContentSize) {
    const { contextState } = this.props;
    const { input } = contextState;
    const { DEFAULT_VALUES } = LayoutContext;
    const mediaArea = windowHeight() - (DEFAULT_VALUES.navBarHeight + DEFAULT_VALUES.actionBarHeight);
    let presentationSize = {};

    if (input.sideBarNavigation.isOpen && !input.sideBarContent.isOpen) {
      presentationSize.width = windowWidth() - sideBarNavigationSize;
    }
    if (input.sideBarContent.isOpen && !input.sideBarNavigation.isOpen) {
      presentationSize.width = windowWidth() - sideBarContentSize;
    }
    if (input.sideBarContent.isOpen && input.sideBarNavigation.isOpen) {
      presentationSize.width = windowWidth() - (sideBarNavigationSize + sideBarContentSize);
    }
    if (autoArrangeLayout) {
      presentationSize.height = min(max((mediaArea * 0.8), (mediaArea * 0.2)), (mediaArea * 0.8));
    }

    return presentationSize;
  }

  calculatesLayout() {
    const { contextState, contextDispatch } = this.props;
    const { input } = contextState;
    const { DEFAULT_VALUES, ACTIONS } = LayoutContext;
    const {
      sideBarNavigationSize,
      sideBarContentSize,
    } = this.calculatesSideBarSize();
    const cameraDockSize = this.calculatesCameraDockSize(
      sideBarNavigationSize.width, sideBarContentSize.width);
    const presentationSize = this.calculatesPresentationSize(
      sideBarNavigationSize.width, sideBarContentSize.width);

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
