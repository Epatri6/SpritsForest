import React from 'react';
import ReactDOM from 'react-dom';
import PlaceableMechanic from './PlaceableMechanic';

it('renders without crashing without props', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlaceableMechanic />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlaceableMechanic mechanic={ {name: 'redirect', direction: 'up'} }/>, div);
  ReactDOM.unmountComponentAtNode(div);
})