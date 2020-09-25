import React, { PureComponent } from 'react';
import styles from './styles.module.sass';
import { Resizable } from 're-resizable';
import LayoutContext from '../Layout/context';

export default class SideBarNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resizableWidth: props.width,
      resizableHeight: props.height,
    }
  }

  render() {
    const { DEFAULT_VALUES } = LayoutContext;
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
        handleWrapperClass="resizeWrapper"
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
        >...</div>
      </Resizable>
    );
  }
}