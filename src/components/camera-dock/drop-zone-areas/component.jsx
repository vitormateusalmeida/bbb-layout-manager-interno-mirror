import React, { PureComponent, Fragment } from 'react'
import styles from './styles.module.sass';

class DropZone extends PureComponent {
  render() {
    const { id, style } = this.props;
    return (
      <Fragment>
        <div
          id={id}
          className={styles.dropZoneArea}
          style={{ ...style }}
        />
        <div
          className={styles.dropZoneBg}
          style={{ ...style }}
        >Drop Here</div>
      </Fragment>
    );
  }
}

export default DropZone;
