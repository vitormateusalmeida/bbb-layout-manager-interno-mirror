import React, { PureComponent } from 'react';
import styles from './styles.module.sass';

export default class NavBar extends PureComponent {
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
        className={styles.navBar}
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