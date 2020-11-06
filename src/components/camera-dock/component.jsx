import React, { PureComponent, Fragment } from 'react';
import styles from './styles.module.sass';
import { Resizable } from 're-resizable';
import LayoutContext from '../Layout/context';
import { CAMERADOCK_POSITION } from '../Layout/layout-manager/enums';
import Draggable from 'react-draggable';
import DropAreaContainer from './drop-areas/container';

export default class CameraDock extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resizableWidth: props.width,
      resizableHeight: props.height,
      isDragging: false,
      isResizing: false,
      resizeStartHeight: 0,
      resizeStartWidth: 0,
      position: {
        x: 0, y: 0
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { isResizing } = this.state;
    if (!isResizing
      && (prevProps.height !== this.props.height
        || prevProps.width !== this.props.width)) {
      this.setState({
        resizableWidth: this.props.width,
        resizableHeight: this.props.height,
      });
    }
  }

  handleCameraDockDragStart = () => {
    const { contextDispatch } = this.props;
    const { ACTIONS } = LayoutContext;
    this.setState({ isDragging: true });
    document.body.style.overflow = 'hidden';

    contextDispatch({
      type: ACTIONS.SET_CAMERA_DOCK_IS_DRAGGING,
      value: true
    });
  }

  handleCameraDockDragStop = (e) => {
    const { contextDispatch } = this.props;
    const { ACTIONS } = LayoutContext;
    this.setState({ isDragging: false });
    document.body.style.overflow = 'auto';

    if (Object.values(CAMERADOCK_POSITION).includes(e.target.id)) {
      contextDispatch({
        type: ACTIONS.SET_CAMERA_DOCK_POSITION,
        value: e.target.id,
      });
    }

    contextDispatch({
      type: ACTIONS.SET_CAMERA_DOCK_IS_DRAGGING,
      value: false
    });
  }

  setCameraDockSize(dWidth, dHeight) {
    const { resizeStartHeight, resizeStartWidth } = this.state;
    const { contextDispatch, isResizable } = this.props;
    const { ACTIONS } = LayoutContext;

    if (isResizable.top || isResizable.bottom) {
      contextDispatch({
        type: ACTIONS.SET_CAMERA_DOCK_SIZE,
        value: {
          height: resizeStartHeight + dHeight,
          browserWidth: window.innerWidth,
          browserHeight: window.innerHeight,
        }
      });
    }
    if (isResizable.left || isResizable.right) {
      contextDispatch({
        type: ACTIONS.SET_CAMERA_DOCK_SIZE,
        value: {
          width: resizeStartWidth + dWidth,
          browserWidth: window.innerWidth,
          browserHeight: window.innerHeight,
        }
      });
    }
  }

  render() {
    const {
      display,
      minWidth,
      width,
      maxWidth,
      minHeight,
      height,
      maxHeight,
      top,
      left,
      tabOrder,
      isDraggable,
      isResizable,
    } = this.props;
    const {
      isResizing,
      isDragging
    } = this.state;

    console.log('cameradock isDraggable', isDraggable);
    console.log('cameradock isResizing', isResizing);

    return (
      <Fragment>
        { isDragging ? <DropAreaContainer /> : null}
        <Draggable
          handle="#cameraDock"
          bounds="html"
          onStart={this.handleCameraDockDragStart}
          onStop={this.handleCameraDockDragStop}
          onMouseDown={e => e.preventDefault()}
          disabled={!isDraggable || isResizing}
          position={{ x: left, y: top }}
        >
          <Resizable
            minWidth={minWidth}
            maxWidth={maxWidth}
            minHeight={minHeight}
            maxHeight={maxHeight}
            size={{
              width: width,
              height: height,
            }}
            enable={{
              top: isResizable.top,
              right: isResizable.right,
              bottom: isResizable.bottom,
              left: isResizable.left,
            }}
            handleWrapperClass="resizecameraDockWrapper"
            onResizeStart={() => {
              this.setState({
                isResizing: true,
                resizeStartWidth: width,
                resizeStartHeight: height,
              });
            }}
            onResize={(e, direction, ref, d) => this.setCameraDockSize(d.width, d.height)}
            onResizeStop={(e, direction, ref, d) => {
              this.setState({
                isResizing: false,
                resizeStartHeight: 0,
                resizeStartWidth: 0,
              });
            }}
            style={{
              position: "absolute",
              zIndex: isDragging ? 4 : undefined,
            }}
          >
            <div
              id="cameraDock"
              className={styles.cameraDock}
              style={{
                display: !display ? 'none' : 'flex',
                width: width,
                height: height,
                opacity: isDragging
                  ? 0.5
                  : undefined,
              }}
            >
              Camera Dock
            </div>
          </Resizable>
        </Draggable>
      </Fragment>
    );
  }
}