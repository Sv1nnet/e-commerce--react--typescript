import { TState, TAction } from './src/reducers/types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers/rootReducer';

import App from './src/App';


const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));
const store: Store<TState, Action<TAction>> = createStore(rootReducer, composeEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
