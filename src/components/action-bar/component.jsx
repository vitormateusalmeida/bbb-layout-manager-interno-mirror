import React, { PureComponent } from 'react';
import styles from './styles.module.sass';

export default class ActionBar extends PureComponent {
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
        className={styles.actionBar}
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