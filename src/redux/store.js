import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

/* eslint-disable */

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
