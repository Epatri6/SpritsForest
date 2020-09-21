import React from 'react';
import ReactDOM from 'react-dom';
import PopUpScreen from './PopUpScreen';
import {spritWaveSprites} from '../../sprites/index';

it('renders without crashing without props', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopUpScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopUpScreen sprites={spritWaveSprites} fps={10} message='testing'><button>Test</button> </PopUpScreen>, div);
  ReactDOM.unmountComponentAtNode(div);
})