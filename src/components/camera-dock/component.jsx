import React, { PureComponent, Fragment } from 'react';
import styles from './styles.module.sass';
import { Resizable } from 're-resizable';
import LayoutContext from '../Layout/context';
import DEFAULT_VALUES from '../Layout/layout-manager/defaultValues';
import _ from 'lodash';
import Draggable from 'react-draggable';
import DropZone from './drop-zone/component';

export default class CameraDock extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resizableWidth: props.width,
      resizableHeight: props.height,
      isDragging: false,
      isResizing: false,
      resizeStartHeight: 0,
      position: {
        x: 0, y: 0
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { isResizing } = this.state;
    if (!isResizing && (prevProps.height !== this.props.height || prevProps.width !== this.props.width)) {
      this.setState({
        resizableWidth: this.props.width,
        resizableHeight: this.props.height,
      });
    }
  }

  handleCameraDockDragStart = () => {
    this.setState({ isDragging: true });
    document.body.style.overflow = 'hidden';
  }

  handleCameraDockDragStop = () => {
    this.setState({ isDragging: false });
    document.body.style.overflow = 'auto';
  }

  setCameraDockHeight(dWidth, dHeight) {
    const { resizeStartHeight } = this.state;
    const { contextDispatch } = this.props;
    const { ACTIONS } = LayoutContext;

    this.setState({ resizableHeight: resizeStartHeight + dHeight });

    contextDispatch({
      type: ACTIONS.SET_CAMERA_DOCK_SIZE,
      value: {
        height: resizeStartHeight + dHeight,
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
      }
    });
  }

  render() {
    const {
      display,
      maxHeight,
      top,
      left,
      tabOrder,
    } = this.props;
    const {
      isResizing,
      resizableWidth,
      resizableHeight,
      isDragging
    } = this.state;
    return (
      <Fragment>
        { isDragging ? <DropZone /> : null}
        <Draggable
          handle="#cameraDock"
          bounds="html"
          onStart={this.handleCameraDockDragStart}
          onStop={this.handleCameraDockDragStop}
          onMouseDown={e => e.preventDefault()}
          disabled={isResizing}
          position={{ x: left, y: top }}
        >
          <Resizable
            minHeight={DEFAULT_VALUES.cameraDockMinHeight}
            maxHeight={maxHeight}
            size={{
              width: resizableWidth,
              height: resizableHeight,
            }}
            enable={{
              bottom: true
            }}
            handleWrapperClass="resizecameraDockWrapper"
            onResizeStart={() => {
              this.setState({ isResizing: true, resizeStartHeight: resizableHeight });
            }}
            onResize={(e, direction, ref, d) => this.setCameraDockHeight(d.width, d.height)}
            onResizeStop={(e, direction, ref, d) => {
              this.setState({ isResizing: false, resizeStartHeight: 0 });
            }}
            style={{
              position: "absolute",
            }}
          >
            <div
              id="cameraDock"
              className={styles.cameraDock}
              style={{
                display: !display ? 'none' : 'flex',
                width: '100%',
                height: '100%',
              }}
            ></div>
          </Resizable>
        </Draggable>
      </Fragment>
    );
  }
}