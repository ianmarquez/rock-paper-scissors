import React from 'react';
import ReactDOM from 'react-dom';
import ComputerHandRandomizer from './ComputerHandRandomizer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComputerHandRandomizer onGenerate={() => console.log('onEnd')}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
