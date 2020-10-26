import React, { PureComponent } from 'react';
import styles from './styles.module.sass';
import Button from '../button/component';
import LayoutContext from '../Layout/context';
import DEFAULT_VALUES from '../Layout/layout-manager/defaultValues';
import { LAYOUT_TYPE, CAMERADOCK_POSITION } from '../Layout/layout-manager/enums';

export default class ActionBar extends PureComponent {
  setLayoutType(layoutType) {
    const { contextDispatch } = this.props;
    const { ACTIONS } = LayoutContext;
    contextDispatch({
      type: ACTIONS.SET_LAYOUT_TYPE,
      value: layoutType
    });
  }

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
        className={styles.actionBar}
        style={{
          display,
          width,
          height,
          top,
          left,
        }}
      >
        <Button
          onClick={() => this.setLayoutType(LAYOUT_TYPE.DEFAULT_LAYOUT)}
        >
          Default Layout
        </Button>
        <Button
          onClick={() => this.setLayoutType(LAYOUT_TYPE.PRESENTATION_FOCUS)}
        >
          Focus on Presentation
        </Button>
        <Button
          onClick={() => this.setLayoutType(LAYOUT_TYPE.VIDEO_FOCUS)}
        >
          Focus on Video
        </Button>
      </div>
    );
  }
}