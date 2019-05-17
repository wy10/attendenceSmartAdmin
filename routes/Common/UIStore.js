import { createStore, combineReducers } from 'redux';


import reducer  from './../Login/reducer';


const reducers = combineReducers({
  reducer,
});

const store = createStore(reducers);

export default store;