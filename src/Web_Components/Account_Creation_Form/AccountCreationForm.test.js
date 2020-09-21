import React from 'react';
import ReactDOM from 'react-dom';
import AccountCreationForm from './AccountCreationForm';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AccountCreationForm/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})