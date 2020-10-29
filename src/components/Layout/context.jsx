import React, { createContext, useReducer } from 'react';
import DEFAULT_VALUES from './layout-manager/defaultValues';
import logger from 'use-reducer-logger';

const Context = createContext();

const ACTIONS = {
  SET_LAYOUT_TYPE: 'setLayoutType',

  SET_BROWSER_SIZE: 'setBrowserSize',

  SET_NAVBAR_OUTPUT: 'setNavBarOutput',

  SET_ACTIONBAR_OUTPUT: 'setActionBarOutput',

  SET_SIDEBAR_NAVIGATION_IS_OPEN: 'setSidebarNavigationIsOpen',
  SET_SIDEBAR_NAVIGATION_SIZE: 'setSidebarNavigationSize',
  SET_SIDEBAR_NAVIGATION_OUTPUT: 'setSidebarNavigationOutput',

  SET_SIDEBAR_CONTENT_IS_OPEN: 'setSidebarContentIsOpen',
  SET_SIDEBAR_CONTENT_SIZE: 'setSidebarContentSize',
  SET_SIDEBAR_CONTENT_PANEL_TYPE: 'setSidebarContentPanelType',
  SET_SIDEBAR_CONTENT_OUTPUT: 'setSidebarContentOutput',

  SET_MEDIA_AREA_SIZE: 'setMediaAreaSize',

  SET_NUM_CAMERAS: 'setNumCameras',
  SET_CAMERA_DOCK_IS_DRAGGING: 'setCameraDockIsDragging',
  SET_CAMERA_DOCK_POSITION: 'setCameraDockPosition',
  SET_CAMERA_DOCK_SIZE: 'setCameraDockSize',
  SET_CAMERA_DOCK_OUTPUT: 'setCameraDockOutput',
  SET_CAMERA_DOCK_IS_DRAGGABLE: 'setCameraDockIsDraggable',
  SET_CAMERA_DOCK_IS_RESIZABLE: 'setCameraDockIsResizable',

  SET_DROP_AREAS: 'setDropAreas',

  SET_PRESENTATION_IS_OPEN: 'setPresentationIsOpen',
  SET_PRESENTATION_SLIDE_SIZE: 'setPresentationSlideSize',
  SET_PRESENTATION_SIZE: 'setPresentationSize',
  SET_PRESENTATION_OUTPUT: 'setPresentationOutput',

  SET_HAS_SCREEN_SHARE: 'setHasScreenShare',
  SET_SCREEN_SHARE_SIZE: 'setScreenShareSize',

  SET_HAS_EXTERNAL_VIDEO: 'setHasExternalVideo',
  SET_EXTERNAL_VIDEO_SIZE: 'setExternalVideoSize',
}

const state = {
  input: {
    layoutType: DEFAULT_VALUES.layoutType,
    customParameters: {

    },
    browser: {
      width: 0,
      height: 0,
    },
    navBar: {
      hasNavBar: true,
      height: DEFAULT_VALUES.navBarHeight,
    },
    actionBar: {
      hasActionBar: true,
      height: DEFAULT_VALUES.actionBarHeight,
    },
    sidebarNavigation: {
      isOpen: true,
      width: 0,
      height: 0,
      browserWidth: 0,
    },
    sidebarContent: {
      isOpen: true,
      currentPanelType: DEFAULT_VALUES.panelType,
      width: 0,
      height: 0,
      browserWidth: 0,
    },
    cameraDock: {
      numCameras: 1,
      position: DEFAULT_VALUES.cameraPosition,
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0,
      isDragging: false,
    },
    presentation: {
      isOpen: true,
      slideSize: {
        width: 0,
        height: 0,
      },
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0,
    },
    screenShare: {
      hasScreenShare: false,
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0,
    },
    externalVideo: {
      hasExternalVideo: false,
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0,
    }
  },
  output: {
    navBar: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0,
    },
    actionBar: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0,
    },
    sidebarNavigation: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0,
    },
    sidebarContent: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      currentPanelType: '',
      tabOrder: 0,
    },
    mediaArea: {
      width: 0,
      height: 0,
    },
    cameraDock: {
      display: false,
      width: 0,
      height: 0,
      maxHeight: 0,
      top: 0,
      left: 0,
      tabOrder: 0,
      isDraggable: false,
      isResizable: {
        top: false,
        right: false,
        bottom: false,
        left: false,
      },
    },
    dropZoneAreas: {},
    presentation: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0,
    },
    screenShare: {
      display: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    },
    externalVideo: {
      display: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0,
    }
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LAYOUT_TYPE: {
      if (state.input.layoutType === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          layoutType: action.value,
        }
      };
    }

    case ACTIONS.SET_BROWSER_SIZE: {
      if (state.input.browser.width === action.value.width
        && state.input.browser.height === action.value.height) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          browser: {
            width: action.value.width,
            height: action.value.height,
          }
        }
      };
    }

    case ACTIONS.SET_NAVBAR_OUTPUT: {
      if (state.output.navBar.display === action.value.display
        && state.output.navBar.width === action.value.width
        && state.output.navBar.height === action.value.height
        && state.output.navBar.top === action.value.top
        && state.output.navBar.left === action.value.left
        && state.output.navBar.tabOrder === action.value.tabOrder) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          navBar: {
            display: action.value.display,
            width: action.value.width,
            height: action.value.height,
            top: action.value.top,
            left: action.value.left,
            tabOrder: action.value.tabOrder
          }
        }
      };
    }

    case ACTIONS.SET_ACTIONBAR_OUTPUT: {
      if (state.output.actionBar.display === action.value.display
        && state.output.actionBar.width === action.value.width
        && state.output.actionBar.height === action.value.height
        && state.output.actionBar.top === action.value.top
        && state.output.actionBar.left === action.value.left
        && state.output.actionBar.tabOrder === action.value.tabOrder) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          actionBar: {
            display: action.value.display,
            width: action.value.width,
            height: action.value.height,
            top: action.value.top,
            left: action.value.left,
            tabOrder: action.value.tabOrder
          }
        }
      };
    }

    case ACTIONS.SET_SIDEBAR_NAVIGATION_IS_OPEN: {
      if (state.input.sidebarNavigation.isOpen === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          sidebarNavigation: {
            ...state.input.sidebarNavigation,
            isOpen: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_NAVIGATION_SIZE: {
      if (state.input.sidebarNavigation.width === action.value.width
        && state.input.sidebarNavigation.browserWidth === action.value.browserWidth) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          sidebarNavigation: {
            ...state.input.sidebarNavigation,
            width: action.value.width,
            browserWidth: action.value.browserWidth,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_NAVIGATION_OUTPUT: {
      if (state.output.sidebarNavigation.display === action.value.display
        && state.output.sidebarNavigation.width === action.value.width
        && state.output.sidebarNavigation.height === action.value.height
        && state.output.sidebarNavigation.top === action.value.top
        && state.output.sidebarNavigation.left === action.value.left
        && state.output.sidebarNavigation.tabOrder === action.value.tabOrder) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          sidebarNavigation: {
            display: action.value.display,
            width: action.value.width,
            height: action.value.height,
            top: action.value.top,
            left: action.value.left,
            tabOrder: action.value.tabOrder
          }
        }
      };
    }


    case ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN: {
      if (state.input.sidebarContent.isOpen === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          sidebarContent: {
            ...state.input.sidebarContent,
            isOpen: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_CONTENT_SIZE: {
      if (state.input.sidebarContent.width === action.value.width
        && state.input.sidebarContent.browserWidth === action.value.browserWidth) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          sidebarContent: {
            ...state.input.sidebarContent,
            width: action.value.width,
            browserWidth: action.value.browserWidth,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_CONTENT_OUTPUT: {
      if (state.output.sidebarContent.display === action.value.display
        && state.output.sidebarContent.width === action.value.width
        && state.output.sidebarContent.height === action.value.height
        && state.output.sidebarContent.top === action.value.top
        && state.output.sidebarContent.left === action.value.left
        && state.output.sidebarContent.tabOrder === action.value.tabOrder) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          sidebarContent: {
            display: action.value.display,
            width: action.value.width,
            height: action.value.height,
            top: action.value.top,
            left: action.value.left,
            currentPanelType: action.value.currentPanelType,
            tabOrder: action.value.tabOrder
          }
        }
      };
    }

    case ACTIONS.SET_MEDIA_AREA_SIZE: {
      if (state.output.mediaArea.width === action.value.width
        && state.output.mediaArea.height === action.value.height) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          mediaArea: {
            ...state.output.mediaArea,
            width: action.value.width,
            height: action.value.height,
          }
        }
      };
    }

    case ACTIONS.SET_NUM_CAMERAS: {
      if (state.input.cameraDock.numCameras === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          cameraDock: {
            ...state.input.cameraDock,
            numCameras: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_CAMERA_DOCK_IS_DRAGGING: {
      if (state.input.cameraDock.isDragging === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          cameraDock: {
            ...state.input.cameraDock,
            isDragging: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_CAMERA_DOCK_POSITION: {
      if (state.input.cameraDock.position === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          cameraDock: {
            ...state.input.cameraDock,
            position: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_CAMERA_DOCK_SIZE: {
      if (state.input.cameraDock.width === action.value.width
        && state.input.cameraDock.height === action.value.height
        && state.input.cameraDock.browserWidth === action.value.browserWidth
        && state.input.cameraDock.browserHeight === action.value.browserHeight) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          cameraDock: {
            ...state.input.cameraDock,
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }
    case ACTIONS.SET_CAMERA_DOCK_OUTPUT: {
      if (state.output.cameraDock.display === action.value.display
        && state.output.cameraDock.width === action.value.width
        && state.output.cameraDock.height === action.value.height
        && state.output.cameraDock.maxHeight === action.value.maxHeight
        && state.output.cameraDock.top === action.value.top
        && state.output.cameraDock.left === action.value.left
        && state.output.cameraDock.tabOrder === action.value.tabOrder) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          cameraDock: {
            ...state.output.cameraDock,
            display: action.value.display,
            width: action.value.width,
            height: action.value.height,
            maxHeight: action.value.maxHeight,
            top: action.value.top,
            left: action.value.left,
            tabOrder: action.value.tabOrder,
          }
        }
      };
    }
    case ACTIONS.SET_CAMERA_DOCK_IS_DRAGGABLE: {
      if (state.output.cameraDock.isDraggable === action.value) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          cameraDock: {
            ...state.output.cameraDock,
            isDraggable: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_CAMERA_DOCK_IS_RESIZABLE: {
      if (state.output.cameraDock.isResizable.top === action.value.top
        && state.output.cameraDock.isResizable.right === action.value.right
        && state.output.cameraDock.isResizable.bottom === action.value.bottom
        && state.output.cameraDock.isResizable.left === action.value.left) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          cameraDock: {
            ...state.output.cameraDock,
            isResizable: {
              top: action.value.top,
              right: action.value.right,
              bottom: action.value.bottom,
              left: action.value.left,
            }
          }
        }
      };
    }

    case ACTIONS.SET_DROP_AREAS: {
      if (state.output.dropZoneAreas === action.value) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          dropZoneAreas: action.value,
        }
      };
    }

    case ACTIONS.SET_PRESENTATION_IS_OPEN: {
      if (state.input.presentation.isOpen === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          presentation: {
            ...state.input.presentation,
            isOpen: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_PRESENTATION_SLIDE_SIZE: {
      if (state.input.presentation.slideSize.width === action.value.width
        && state.input.presentation.slideSize.height === action.value.height) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          presentation: {
            ...state.input.presentation,
            slideSize: {
              width: action.value.width,
              height: action.value.height,
            }
          }
        }
      };
    }
    case ACTIONS.SET_PRESENTATION_SIZE: {
      if (state.input.presentation.width === action.value.width
        && state.input.presentation.height === action.value.height
        && state.input.presentation.browserWidth === action.value.browserWidth
        && state.input.presentation.browserHeight === action.value.browserHeight) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          presentation: {
            ...state.input.presentation,
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }
    case ACTIONS.SET_PRESENTATION_OUTPUT: {
      if (state.output.presentation.display === action.value.display
        && state.output.presentation.width === action.value.width
        && state.output.presentation.height === action.value.height
        && state.output.presentation.top === action.value.top
        && state.output.presentation.left === action.value.left
        && state.output.presentation.tabOrder === action.value.tabOrder) {
        return state;
      }
      return {
        ...state,
        output: {
          ...state.output,
          presentation: {
            display: action.value.display,
            width: action.value.width,
            height: action.value.height,
            top: action.value.top,
            left: action.value.left,
            tabOrder: action.value.tabOrder,
          }
        }
      };
    }

    case ACTIONS.SET_HAS_SCREEN_SHARE: {
      if (state.input.screenShare.hasScreenShare === action.value.hasScreenShare) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          screenShare: {
            ...state.input.screenShare,
            hasScreenShare: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_SCREEN_SHARE_SIZE: {
      if (state.input.screenShare.width === action.value.width
        && state.input.screenShare.height === action.value.height
        && state.input.screenShare.browserWidth === action.value.browserWidth
        && state.input.screenShare.browserHeight === action.value.browserHeight) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          screenShare: {
            ...state.input.screenShare,
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }

    case ACTIONS.SET_HAS_EXTERNAL_VIDEO: {
      if (state.input.externalVideo.hasExternalVideo === action.value) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          externalVideo: {
            ...state.input.externalVideo,
            hasExternalVideo: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_EXTERNAL_VIDEO_SIZE: {
      if (state.input.externalVideo.width === action.value.width
        && state.input.externalVideo.height === action.value.height
        && state.input.externalVideo.browserWidth === action.value.browserWidth
        && state.input.externalVideo.browserHeight === action.value.browserHeight) {
        return state;
      }
      return {
        ...state,
        input: {
          ...state.input,
          externalVideo: {
            ...state.input.externalVideo,
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }
    default: {
      throw new Error('Unexpected action');
    }
  }
};

const ContextProvider = (props) => {
  const [contextState, contextDispatch] = useReducer(logger(reducer), state);
  const { children } = props;
  return (
    <Context.Provider value={{
      contextState,
      contextDispatch,
      ...props,
    }}
    >
      {children}
    </Context.Provider>
  )
}

class LayoutContext {
  static ACTIONS = ACTIONS;
  static withProvider = Component => props => (
    <ContextProvider {...props}>
      <Component />
    </ContextProvider>
  );
  static withConsumer = Component => props => (
    <Context.Consumer>
      {contexts => <Component {...props} {...contexts} />}
    </Context.Consumer>
  );
  static withConsumerDispatch = Component => props => (
    <Context.Consumer>
      {contexts => <Component {...props} contextDispatch={contexts.contextDispatch} />}
    </Context.Consumer>
  );
}
export default LayoutContext;
// const withContext = Component => withProvider(withContextConsumer(Component));