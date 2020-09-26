import React, { PureComponent } from 'react';
import styles from './styles.module.sass';
import { Resizable } from 're-resizable';
import LayoutContext from '../Layout/context';
import DEFAULT_VALUES from '../Layout/layout-manager/defaultValues';
import _ from 'lodash';

class SideBarNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resizableWidth: props.width,
      resizableHeight: props.height,
    }

    this.throttleResizableWidth = _.throttle(
      (dWidth, dHeight) => this.setSideBarNavWidth(dWidth, dHeight),
      100, { 'trailing': true, 'leading': true }
    );
  }

  setSideBarNavWidth(dWidth, dHeight) {
    const { resizableWidth } = this.state;
    const { contextDispatch } = this.props;
    const { ACTIONS } = LayoutContext;

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_SIZE,
      value: {
        width: resizableWidth + dWidth,
        browserWidth: window.innerWidth,
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
        minWidth={DEFAULT_VALUES.sideBarNavMinWidth}
        maxWidth={DEFAULT_VALUES.sideBarNavMaxWidth}
        size={{
          width: resizableWidth,
          height: resizableHeight,
        }}
        enable={{
          right: true
        }}
        handleWrapperClass="resizeWrapper"
        onResize={(e, direction, ref, d) => this.throttleResizableWidth(d.width, d.height)}
        onResizeStop={(e, direction, ref, d) => {
          this.setState({
            resizableWidth: resizableWidth + d.width,
            resizableHeight: resizableHeight + d.height,
          });
        }}
      >
        <div
          className={styles.sidebarNav}
          style={{
            display,
            top,
            left,
            background: 'blue',
            width: '100%',
            height: '100%',
          }}
        ></div>
      </Resizable>
    );
  }
}

export default LayoutContext.withConsumer(SideBarNavigation);