import React from 'react';
import ReactDOM from 'react-dom';
import Mechanics from './Mechanics';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mechanics />, div);
  ReactDOM.unmountComponentAtNode(div);
})