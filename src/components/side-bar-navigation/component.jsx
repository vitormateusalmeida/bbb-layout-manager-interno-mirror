import React, { Component } from 'react';
import styles from './styles.module.sass';

export default class SideBarNavigation extends Component {
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
        className={styles.sidebarNav}
        style={{
          display,
          width,
          height,
          top,
          left,
        }}
      />
    );
  }
}