import React, { createContext, useReducer } from 'react';
import DEFAULT_VALUES from './layout-manager/defaultValues';

const Context = createContext();

const ACTIONS = {
  SET_BROWSER_SIZE: 'SET_BROWSER_SIZE',

  SET_NAVBAR_OUTPUT: 'setNavBarOutPut',

  SET_ACTIONBAR_OUTPUT: 'setActionBarOutput',

  SET_SIDEBAR_NAVIGATION_IS_OPEN: 'setSideBarNavigationIsOpen',
  SET_SIDEBAR_NAVIGATION_SIZE: 'setSideBarNavigationSize',
  SET_SIDEBAR_NAVIGATION_OUTPUT: 'setSideBarNavigationOutPut',

  SET_SIDEBAR_CONTENT_IS_OPEN: 'setSideBarContentIsOpen',
  SET_SIDEBAR_CONTENT_SIZE: 'setSideBarContentSize',
  SET_SIDEBAR_CONTENT_PANEL_TYPE: 'setSideBarContentPanelType',
  SET_SIDEBAR_CONTENT_OUTPUT: 'setSideBarContentOutPut',

  SET_NUM_CAMERAS: 'setNumCameras',
  SET_CAMERA_DOCK_POSITION: 'setCameraDockPosition',
  SET_CAMERA_DOCK_SIZE: 'setCameraDockSize',
  SET_CAMERA_DOCK_OUTPUT: 'setCameraDockOutPut',

  SET_PRESENTATION_IS_OPEN: 'setPresentationIsOpen',
  SET_PRESENTATION_SLIDE_SIZE: 'setPresentationSlideSize',
  SET_PRESENTATION_SIZE: 'setPresentationSize',
  SET_PRESENTATION_OUTPUT: 'setPresentationOutPut',

  SET_HAS_SCREEN_SHARE: 'setHasScreenShare',
  SET_SCREEN_SHARE_SIZE: 'setScreenShareSize',

  SET_HAS_EXTERNAL_VIDEO: 'setHasExternalVideo',
  SET_EXTERNAL_VIDEO_SIZE: 'setExternalVideoSize',
}

const state = {
  input: {
    customParameters: {

    },
    browser: {
      width: 0,
      height: 0
    },
    navBar: {
      hasNavBar: true,
      height: DEFAULT_VALUES.navBarHeight,
    },
    actionBar: {
      hasActionBar: true,
      height: DEFAULT_VALUES.actionBarHeight,
    },
    sideBarNavigation: {
      isOpen: true,
      width: 0,
      browserWidth: 0
    },
    sideBarContent: {
      isOpen: true,
      currentPanelType: DEFAULT_VALUES.panelType,
      width: 0,
      browserWidth: 0
    },
    cameraDock: {
      numCameras: 1,
      position: DEFAULT_VALUES.cameraPosition,
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0,
    },
    presentation: {
      isOpen: true,
      slideSize: {
        width: 0,
        height: 0
      },
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0
    },
    screenShare: {
      hasScreenShare: false,
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0
    },
    externalVideo: {
      hasExternalVideo: false,
      width: 0,
      height: 0,
      browserWidth: 0,
      browserHeight: 0
    }
  },
  output: {
    navBar: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0
    },
    actionBar: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0
    },
    sideBarNavigation: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0
    },
    sideBarContent: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      currentPanelType: '',
      tabOrder: 0,
    },
    cameraDock: {
      display: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0
    },
    presentation: {
      display: true,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0
    },
    screenShare: {
      display: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0
    },
    externalVideo: {
      display: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tabOrder: 0
    }
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_BROWSER_SIZE: {
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
      return {
        ...state,
        input: {
          ...state.input,
          sideBarNavigation: {
            ...state.input.sideBarNavigation,
            isOpen: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_NAVIGATION_SIZE: {
      return {
        ...state,
        input: {
          ...state.input,
          sideBarNavigation: {
            ...state.input.sideBarNavigation,
            width: action.value.width,
            browserWidth: action.value.browserWidth,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_NAVIGATION_OUTPUT: {
      return {
        ...state,
        output: {
          ...state.output,
          sideBarNavigation: {
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
      return {
        ...state,
        input: {
          ...state.input,
          sideBarContent: {
            ...state.input.sideBarContent,
            isOpen: action.value,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_CONTENT_SIZE: {
      return {
        ...state,
        input: {
          ...state.input,
          sideBarContent: {
            ...state.input.sideBarContent,
            width: action.value.width,
            browserWidth: action.value.browserWidth,
          }
        }
      };
    }
    case ACTIONS.SET_SIDEBAR_CONTENT_OUTPUT: {
      return {
        ...state,
        output: {
          ...state.output,
          sideBarContent: {
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

    case ACTIONS.SET_NUM_CAMERAS: {
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
    case ACTIONS.SET_CAMERA_DOCK_POSITION: {
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
      return {
        ...state,
        output: {
          ...state.output,
          cameraDock: {
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

    case ACTIONS.SET_PRESENTATION_IS_OPEN: {
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
  const [contextState, contextDispatch] = useReducer(reducer, state);
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
}
export default LayoutContext;
// const withContext = Component => withProvider(withContextConsumer(Component));