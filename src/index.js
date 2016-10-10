import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/app';
import './style/style.scss';
import './style/rpg-css/rpg-awesome.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

if (typeof window !== 'undefined') {
    window.React = React;
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App/>
  </Provider>
  , document.querySelector('body'));
