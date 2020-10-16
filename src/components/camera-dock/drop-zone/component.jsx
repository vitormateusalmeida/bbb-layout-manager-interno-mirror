import React, { PureComponent, Fragment } from 'react'
import styles from './styles.module.sass';
import LayoutContext from '../../Layout/context';
import { CAMERADOCK_POSITION } from '../../Layout/layout-manager/defaultValues';

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
      height: output.mediaArea.height
        - (2 * DROP_ZONE_DEFAUL_SIZE),
      width: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.dropZoneRight = {
      top: output.navBar.height + DROP_ZONE_DEFAUL_SIZE,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width
        + output.mediaArea.width
        - DROP_ZONE_DEFAUL_SIZE,
      height: output.mediaArea.height
        - (2 * DROP_ZONE_DEFAUL_SIZE),
      width: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.dropZoneTop = {
      top: output.navBar.height,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width,
      width: output.mediaArea.width,
      height: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.dropZoneBottom = {
      top: output.navBar.height
        + output.mediaArea.height
        - DROP_ZONE_DEFAUL_SIZE,
      left: output.sideBarNavigation.width
        + output.sideBarContent.width,
      width: output.mediaArea.width,
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
          id={CAMERADOCK_POSITION.CONTENT_TOP}
          className={styles.dropZoneTop}
          style={{ ...dropZones.dropZoneTop }}
        />
        <div
          className={styles.dropZoneBgTop}
          style={{ ...dropZones.dropZoneTop }}
        >Drop Here</div>
        <div
          id={CAMERADOCK_POSITION.CONTENT_RIGHT}
          className={styles.dropZoneRight}
          style={{ ...dropZones.dropZoneRight }}
        />
        <div
          className={styles.dropZoneBgRight}
          style={{ ...dropZones.dropZoneRight }}
        >Drop Here</div>
        <div
          id={CAMERADOCK_POSITION.CONTENT_BOTTOM}
          className={styles.dropZoneBottom}
          style={{ ...dropZones.dropZoneBottom }}
        />
        <div
          className={styles.dropZoneBgBottom}
          style={{ ...dropZones.dropZoneBottom }}
        >Drop Here</div>
        <div
          id={CAMERADOCK_POSITION.CONTENT_LEFT}
          className={styles.dropZoneLeft}
          style={{ ...dropZones.dropZoneLeft }}
        />
        <div
          className={styles.dropZoneBgLeft}
          style={{ ...dropZones.dropZoneLeft }}
        >Drop Here</div>
      </Fragment>
    );
  }
}

export default LayoutContext.withConsumer(DropZone);
