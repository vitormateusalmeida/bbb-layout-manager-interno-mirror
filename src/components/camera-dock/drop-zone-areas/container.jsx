import React, { PureComponent, Fragment } from 'react';
import LayoutContext from '../../Layout/context';
import DropZone from './component';

class DropZoneContainer extends PureComponent {
  render() {
    const { contextState } = this.props;
    const { output } = contextState;
    const { dropZoneAreas } = output;

    return (
      Object.keys(dropZoneAreas).map((objectKey, index) => {
        console.log('objectKey', objectKey);
        console.log('index', index);
        console.log('dropZoneAreas[objectKey]', dropZoneAreas[objectKey]);
        return <DropZone id={objectKey} style={dropZoneAreas[objectKey]} />;
      })
    );
  }
}

export default LayoutContext.withConsumer(DropZoneContainer);
