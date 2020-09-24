import React, { Component } from 'react';
import styles from './styles.module.sass';

export default class CameraDock extends Component {
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
        className={styles.cameraDock}
        style={{
          display,
          width,
          height,
          top,
          left,
        }}
      ></div>
    );
  }
}