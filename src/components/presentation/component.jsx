import React, { PureComponent } from 'react';
import styles from './styles.module.sass';

export default class Presentation extends PureComponent {
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
        className={styles.presentation}
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