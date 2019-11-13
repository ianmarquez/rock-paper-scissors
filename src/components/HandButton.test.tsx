import React from 'react';
import ReactDOM from 'react-dom';
import HandButton from './HandButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HandButton name={"rock"} active={true}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
