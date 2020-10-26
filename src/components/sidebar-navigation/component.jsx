import React, { PureComponent } from 'react';
import styles from './styles.module.sass';
import { Resizable } from 're-resizable';
import LayoutContext from '../Layout/context';
import DEFAULT_VALUES from '../Layout/layout-manager/defaultValues';

export default class SidebarNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resizableWidth: props.width,
      resizableHeight: props.height,
      isResizing: false,
      resizeStartWidth: 0,
    }
  }

  componentDidUpdate(prevProps) {
    const {isResizing} = this.state;
    if (prevProps.width !== this.props.width && !isResizing) {
      this.setState({resizableWidth : this.props.width});
    }
  }

  setSidebarNavWidth(dWidth, dHeight) {
    const { resizableWidth, resizeStartWidth } = this.state;
    const { contextDispatch } = this.props;
    const { ACTIONS } = LayoutContext;

    this.setState({resizableWidth : resizeStartWidth + dWidth});

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_SIZE,
      value: {
        width: resizeStartWidth + dWidth,
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
      }
    });
  }

  render() {
    const {
      display,
      top,
      left,
      tabOrder,
    } = this.props;
    const { resizableWidth, resizableHeight } = this.state;
    return (
      <Resizable
        minWidth={DEFAULT_VALUES.sidebarNavMinWidth}
        maxWidth={DEFAULT_VALUES.sidebarNavMaxWidth}
        size={{
          width: resizableWidth,
          height: resizableHeight,
        }}
        enable={{
          right: true
        }}
        handleWrapperClass="resizeSidebarNavWrapper"
        onResizeStart={() => {
          this.setState({isResizing: true, resizeStartWidth: resizableWidth});
        }}
        onResize={(e, direction, ref, d) => this.setSidebarNavWidth(d.width, d.height)}
        onResizeStop={(e, direction, ref, d) => {
          this.setState({isResizing:false, resizeStartWidth: 0});
        }}
        style={{
          position: "absolute",
          top,
          left,
          zIndex: 1,
        }}
      >
        <div
          className={styles.sidebarNav}
          style={{
            display: !display ? 'none' : 'flex',
            width: '100%',
            height: '100%',
          }}
        >
          Sidebar Navigation
        </div>
      </Resizable>
    );
  }
}