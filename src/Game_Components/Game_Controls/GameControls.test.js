import React from 'react';
import ReactDOM from 'react-dom';
import GameControls from './GameControls';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameControls />, div);
  ReactDOM.unmountComponentAtNode(div);
})