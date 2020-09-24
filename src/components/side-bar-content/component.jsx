import React, { Component } from 'react';
import styles from './styles.module.sass';

export default class SideBarContent extends Component {
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
        }}
      />
    );
  }
}