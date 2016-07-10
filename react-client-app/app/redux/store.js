import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(mainReducer, compose(
  applyMiddleware(thunk
), window.devToolsExtension ? window.devToolsExtension() : f => f));

export default store;
