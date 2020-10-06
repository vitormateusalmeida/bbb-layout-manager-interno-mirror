import React from 'react';
import ReactDOM from 'react-dom';
import Base from './base/base';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Base />, document.getElementById('root')
);
serviceWorker.unregister();
