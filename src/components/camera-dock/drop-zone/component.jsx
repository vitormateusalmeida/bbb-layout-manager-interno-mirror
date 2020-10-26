import React, { PureComponent, Fragment } from 'react'
import styles from './styles.module.sass';
import LayoutContext from '../../Layout/context';
import { CAMERADOCK_POSITION } from '../../Layout/layout-manager/enums';

const DROP_ZONE_DEFAUL_SIZE = 100;

const windowWidth = () => window.document.documentElement.clientWidth;
const windowHeight = () => window.document.documentElement.clientHeight;

class DropZone extends PureComponent {
  calculatesDropZoneSize() {
    const { contextState, contextDispatch } = this.props;
    const { input, output } = contextState;

    let dropZones = {
      contentTop: {},
      contentRight: {},
      contentBottom: {},
      contentLeft: {},
    }

    dropZones.contentLeft = {
      top: output.navBar.height + DROP_ZONE_DEFAUL_SIZE,
      left: output.sidebarNavigation.width
        + output.sidebarContent.width,
      height: output.mediaArea.height
        - (2 * DROP_ZONE_DEFAUL_SIZE),
      width: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.contentRight = {
      top: output.navBar.height + DROP_ZONE_DEFAUL_SIZE,
      left: output.sidebarNavigation.width
        + output.sidebarContent.width
        + output.mediaArea.width
        - DROP_ZONE_DEFAUL_SIZE,
      height: output.mediaArea.height
        - (2 * DROP_ZONE_DEFAUL_SIZE),
      width: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.contentTop = {
      top: output.navBar.height,
      left: output.sidebarNavigation.width
        + output.sidebarContent.width,
      width: output.mediaArea.width,
      height: DROP_ZONE_DEFAUL_SIZE,
    }

    dropZones.contentBottom = {
      top: output.navBar.height
        + output.mediaArea.height
        - DROP_ZONE_DEFAUL_SIZE,
      left: output.sidebarNavigation.width
        + output.sidebarContent.width,
      width: output.mediaArea.width,
      height: DROP_ZONE_DEFAUL_SIZE
    }

    dropZones.sidebarContentBottom = {
      top: windowHeight() - DROP_ZONE_DEFAUL_SIZE,
      left: output.sidebarNavigation.width,
      width: output.sidebarContent.width,
      height: DROP_ZONE_DEFAUL_SIZE,
    }

    return { dropZones };
  }

  render() {
    const { contextState, contextDispatch } = this.props;
    const { input, output } = contextState;

    const { dropZones } = this.calculatesDropZoneSize();

    return (
      <Fragment>
        <div
          id={CAMERADOCK_POSITION.CONTENT_TOP}
          className={styles.dropZoneArea}
          style={{ ...dropZones.contentTop }}
        />
        <div
          className={styles.dropZoneBg}
          style={{ ...dropZones.contentTop }}
        >Drop Here</div>
        
        <div
          id={CAMERADOCK_POSITION.CONTENT_RIGHT}
          className={styles.dropZoneArea}
          style={{ ...dropZones.contentRight }}
        />
        <div
          className={styles.dropZoneBg}
          style={{ ...dropZones.contentRight }}
        >Drop Here</div>

        <div
          id={CAMERADOCK_POSITION.CONTENT_BOTTOM}
          className={styles.dropZoneArea}
          style={{ ...dropZones.contentBottom }}
        />
        <div
          className={styles.dropZoneBg}
          style={{ ...dropZones.contentBottom }}
        >Drop Here</div>

        <div
          id={CAMERADOCK_POSITION.CONTENT_LEFT}
          className={styles.dropZoneArea}
          style={{ ...dropZones.contentLeft }}
        />
        <div
          className={styles.dropZoneBg}
          style={{ ...dropZones.contentLeft }}
        >Drop Here</div>

        <div
          id={CAMERADOCK_POSITION.SIDEBAR_CONTENT_BOTTOM}
          className={styles.dropZoneArea}
          style={{ ...dropZones.sidebarContentBottom }}
        />
        <div
          className={styles.dropZoneBg}
          style={{ ...dropZones.sidebarContentBottom }}
        >Drop Here</div>
      </Fragment>
    );
  }
}

export default LayoutContext.withConsumer(DropZone);
