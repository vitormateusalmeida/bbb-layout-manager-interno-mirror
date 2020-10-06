import React, { PureComponent, Fragment } from 'react'
import styles from './styles.module.sass';
import LayoutContext from '../../Layout/context';

const DROP_ZONE_DEFAUL_SIZE = 100;

class DropZone extends PureComponent {
  calculatesDropZoneSize() {
    const { contextState, contextDispatch } = this.props;
    const { input, output } = contextState;

    let dropZones = {
      dropZoneLeft: {},
      dropZoneRight: {},
      dropZoneTop: {},
      dropZoneBottom: {},
    }

    dropZones.dropZoneLeft = {
      top: output.navBar.height + DROP_ZONE_DEFAUL_SIZE,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width,
      height: (
        input.cameraDock.position === 'top'
          || input.cameraDock.position === 'bottom'
          ? output.cameraDock.height
          + output.presentation.height
          : output.presentation.height
      )
        - (2 * DROP_ZONE_DEFAUL_SIZE),
      width: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.dropZoneRight = {
      top: output.navBar.height + DROP_ZONE_DEFAUL_SIZE,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width
        + (
          input.cameraDock.position === 'top'
            || input.cameraDock.position === 'bottom'
            ? output.presentation.width
            : output.cameraDock.width + output.presentation.width
        )
        - DROP_ZONE_DEFAUL_SIZE,
      height: (
        input.cameraDock.position === 'top'
          || input.cameraDock.position === 'bottom'
          ? output.cameraDock.height
          + output.presentation.height
          : output.presentation.height
      )
        - (2 * DROP_ZONE_DEFAUL_SIZE),
      width: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.dropZoneTop = {
      top: output.navBar.height,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width,
      width: output.cameraDock.width,
      height: DROP_ZONE_DEFAUL_SIZE
    }

    dropZones.dropZoneBottom = {
      top: output.navBar.height
        + (
          input.cameraDock.position === 'top'
            || input.cameraDock.position === 'bottom'
            ? output.cameraDock.height
            + output.presentation.height
            : output.presentation.height
        )
        - DROP_ZONE_DEFAUL_SIZE,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width,
      width: output.cameraDock.width,
      height: DROP_ZONE_DEFAUL_SIZE
    }

    return { dropZones };
  }

  render() {
    const { contextState, contextDispatch } = this.props;
    const { input, output } = contextState;
    console.log('input', input);
    console.log('output', output);

    const { dropZones } = this.calculatesDropZoneSize();
    console.log('dropZones', dropZones);

    return (
      <Fragment>
        <div
          id="dropZoneTop"
          className={styles.dropZoneTop}
          style={{ ...dropZones.dropZoneTop }}
        />
        <div
          id="dropZoneRight"
          className={styles.dropZoneRight}
          style={{ ...dropZones.dropZoneRight }}
        />
        <div
          id="dropZoneBottom"
          className={styles.dropZoneBottom}
          style={{ ...dropZones.dropZoneBottom }}
        />
        <div
          id="dropZoneLeft"
          className={styles.dropZoneLeft}
          style={{ ...dropZones.dropZoneLeft }}
        />
      </Fragment>
    );
  }
}

export default LayoutContext.withConsumer(DropZone);
