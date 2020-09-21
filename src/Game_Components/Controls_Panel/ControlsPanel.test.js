import React from 'react';
import ReactDOM from 'react-dom';
import ControlsPanel from './ControlsPanel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ControlsPanel />, div);
  ReactDOM.unmountComponentAtNode(div);
})