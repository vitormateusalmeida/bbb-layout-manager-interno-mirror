import React, { createContext, useReducer } from 'react';

export const Context = createContext();

export const layoutDefaultValues = {
  panelType: 'chat',
  cameraPosition: 'top',
  navBarHeight: 0,
  actionBarHeight: 0
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
      hasNavBar: true
    },
    actionBar: {
      hasActionBar: true
    },
    sideBarNavigation: {
      isOpen: true,
      width: 0,
      browserWidth: 0
    },
    sideBarContent: {
      isOpen: true,
      currentPanelType: layoutDefaultValues.panelType,
      width: 0,
      browserWidth: 0
    },
    cameraDock: {
      numCameras: 0,
      position: layoutDefaultValues.cameraPosition,
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
    case 'setBrowserSize': {
      return {
        ...state,
        input: {
          browser: {
            width: action.value.width,
            height: action.value.height,
          }
        }
      };
    }
    case 'setSideBarNavigationIsOpen': {
      return {
        ...state,
        input: {
          sideBarNavigation: {
            isOpen: action.value,
          }
        }
      };
    }
    case 'setSideBarNavigationSize': {
      return {
        ...state,
        input: {
          sideBarNavigation: {
            width: action.value.width,
            browserWidth: action.value.browserWidth,
          }
        }
      };
    }
    case 'setNumCameras': {
      return {
        input: {
          cameraDock: {
            numCameras: action.value,
          }
        }
      };
    }
    case 'setCameraDockPosition': {
      return {
        input: {
          cameraDock: {
            position: action.value,
          }
        }
      };
    }
    case 'setCameraDockSize': {
      return {
        input: {
          cameraDock: {
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }
    case 'setPresentationIsOpen': {
      return {
        ...state,
        input: {
          presentation: {
            isOpen: action.value,
          }
        }
      };
    }
    case 'setPresentationSlideSize': {
      return {
        input: {
          presentation: {
            slideSize: {
              width: action.value.width,
              height: action.value.height,
            }
          }
        }
      };
    }
    case 'setPresentationSize': {
      return {
        input: {
          presentation: {
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }
    case 'setHasScreenShare': {
      return {
        input: {
          screenShare: {
            hasScreenShare: action.value,
          }
        }
      };
    }
    case 'setScreenShareSize': {
      return {
        input: {
          screenShare: {
            width: action.value.width,
            height: action.value.height,
            browserWidth: action.value.browserWidth,
            browserHeight: action.value.browserHeight,
          }
        }
      };
    }
    case 'setHasExternalVideo': {
      return {
        input: {
          externalVideo: {
            hasExternalVideo: action.value,
          }
        }
      };
    }
    case 'setExternalVideoSize': {
      return {
        input: {
          externalVideo: {
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

const withProvider = Component => props => (
  <ContextProvider {...props}>
    <Component />
  </ContextProvider>
)

const ContextConsumer = Component => props => (
  <Context.Consumer>
    {contexts => <Component {...props} {...contexts} />}
  </Context.Consumer>
);

const withContextConsumer = Component => ContextConsumer(Component);
const withContext = Component => withProvider(withContextConsumer(Component));

export {
  withProvider,
  withContextConsumer,
  withContext,
};