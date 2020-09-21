import React from 'react';
import ReactDOM from 'react-dom';
import GameSprite from './GameSprite';
import {spritWaveSprites} from '../../sprites/index';

it('renders without crashing with no props', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameSprite />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing with props', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameSprite fps={10} sprites={spritWaveSprites}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})