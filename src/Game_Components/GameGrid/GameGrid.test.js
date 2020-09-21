import React from 'react';
import ReactDOM from 'react-dom';
import GameGrid from './GameGrid';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameGrid />, div);
  ReactDOM.unmountComponentAtNode(div);
})