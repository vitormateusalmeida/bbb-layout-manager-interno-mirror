import React, { PureComponent } from 'react';
import styles from './styles.module.sass';

export default class SideBarContent extends PureComponent {
  render() {
    const {
      display,
      width,
      height,
      top,
      left,
      tabOrder,
    } = this.props;
    return (
      <div
        className={styles.sidebarContent}
        style={{
          display,
          width,
          height,
          top,
          left,
          zIndex: 1,
        }}
      />
    );
  }
}