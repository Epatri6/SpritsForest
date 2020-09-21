import React from 'react';
import ReactDOM from 'react-dom';
import AccountEditForm from './AccountEditForm';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AccountEditForm/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})