import React, { PureComponent } from 'react';
import styles from './styles.module.sass';
import LayoutContext from '../Layout/context';
import { Resizable } from 're-resizable';

export default class Presentation extends PureComponent {
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

  setPresentationSize(dWidth, dHeight) {
    const { resizeStartHeight, resizeStartWidth } = this.state;
    const { contextDispatch, isResizable } = this.props;
    const { ACTIONS } = LayoutContext;

    // if (isResizable.top || isResizable.bottom) {
    //   contextDispatch({
    //     type: ACTIONS.SET_CAMERA_DOCK_SIZE,
    //     value: {
    //       height: resizeStartHeight + dHeight,
    //       browserWidth: window.innerWidth,
    //       browserHeight: window.innerHeight,
    //     }
    //   });
    // }
    // if (isResizable.left || isResizable.right) {
    //   contextDispatch({
    //     type: ACTIONS.SET_CAMERA_DOCK_SIZE,
    //     value: {
    //       width: resizeStartWidth + dWidth,
    //       browserWidth: window.innerWidth,
    //       browserHeight: window.innerHeight,
    //     }
    //   });
    // }
  }

  render() {
    const {
      display,
      isResizable,
      minWidth,
      width,
      maxWidth,
      minHeight,
      height,
      maxHeight,
      top,
      left,
      tabOrder,
    } = this.props;
    return (
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
        handleWrapperClass="resizePresentationWrapper"
        onResizeStart={() => {
          this.setState({
            isResizing: true,
            resizeStartWidth: width,
            resizeStartHeight: height,
          });
        }}
        // onResize={(e, direction, ref, d) => this.setCameraDockSize(d.width, d.height)}
        onResizeStop={(e, direction, ref, d) => {
          this.setState({
            isResizing: false,
            resizeStartHeight: 0,
            resizeStartWidth: 0,
          });
        }}
        style={{
          position: "absolute",
          zIndex: 3,
          top: top,
          left: left,
        }}
      >
        <div
          className={styles.presentation}
          style={{
            display: !display ? 'none' : 'flex',
            width: width,
            height: height,
          }}
        >Presentation</div>
      </Resizable>
    );
  }
}