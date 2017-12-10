import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore()

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root'));
