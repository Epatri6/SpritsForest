import React from 'react';
import ReactDOM from 'react-dom';
import GridSquare from './GridSquare';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GridSquare />, div);
  ReactDOM.unmountComponentAtNode(div);
})