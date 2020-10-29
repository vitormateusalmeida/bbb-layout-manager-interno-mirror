import React, { PureComponent, Fragment } from 'react';
import LayoutContext from '../../Layout/context';
import DropArea from './component';

class DropAreaContainer extends PureComponent {
  render() {
    const { contextState } = this.props;
    const { output } = contextState;
    const { dropZoneAreas } = output;

    return (
      Object.keys(dropZoneAreas).map((objectKey, index) => {
        console.log('objectKey', objectKey);
        console.log('index', index);
        console.log('dropZoneAreas[objectKey]', dropZoneAreas[objectKey]);
        return <DropArea id={objectKey} style={dropZoneAreas[objectKey]} />;
      })
    );
  }
}

export default LayoutContext.withConsumer(DropAreaContainer);
