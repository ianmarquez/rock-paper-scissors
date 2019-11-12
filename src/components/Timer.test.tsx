import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Timer onTimerEnd={() => console.log('onEnd')} shouldStart={true}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
