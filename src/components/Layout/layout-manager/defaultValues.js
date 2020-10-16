const CAMERADOCK_POSITION = {
  CONTENT_TOP: 'contentTop',
  CONTENT_RIGHT: 'contentRight',
  CONTENT_BOTTOM: 'contentBottom',
  CONTENT_LEFT: 'contentLeft',
  SIDEBAR_CONTENT_BOTTOM: 'sidebarContentBottom',
}

const DEFAULT_VALUES = {
  panelType: 'chat',

  cameraPosition: 'contentTop',
  cameraDockTabOrder: 4,
  cameraDockMinHeight: 140,
  cameraDockMinWidth: 140,

  presentationTabOrder: 5,
  presentationMinHeight: 140,

  navBarHeight: 85,
  navBarTop: 0,
  navBarTabOrder: 3,

  actionBarHeight: 65,
  actionBarTabOrder: 6,

  sideBarNavMaxWidth: 240,
  sideBarNavMinWidth: 150,
  sideBarNavHeight: '100%',
  sideBarNavTop: 0,
  sideBarNavLeft: 0,
  sideBarNavTabOrder: 1,

  sideBarContentMaxWidth: 350,
  sideBarContentMinWidth: 150,
  sideBarContentHeight: '100%',
  sideBarContentTop: 0,
  sideBarContentTabOrder: 2,
}

export default DEFAULT_VALUES;
export {
  CAMERADOCK_POSITION
};