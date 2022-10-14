import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Login1 from './Login1';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Login1/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
