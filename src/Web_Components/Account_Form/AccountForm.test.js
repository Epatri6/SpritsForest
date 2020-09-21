import React from 'react';
import ReactDOM from 'react-dom';
import AccountForm from './AccountForm';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AccountForm/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})