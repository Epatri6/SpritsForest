import React from 'react';
import ReactDOM from 'react-dom';
import LoginScreen from './LoginScreen';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><LoginScreen/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})