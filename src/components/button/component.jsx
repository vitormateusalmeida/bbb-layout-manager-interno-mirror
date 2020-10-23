import React, { PureComponent } from 'react';
import styles from './styles.module.sass';

export default class Button extends PureComponent {
  render() {
    const {
      children,
      onClick,
    } = this.props;
    return (
      <div
        className={`${styles.button} ${styles.regular}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
}