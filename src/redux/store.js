import { legacy_createStore as createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

/* eslint-disable */

export default createStore(
  rootReducer,
  applyMiddleware(thunk),
);
