import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducer from '../reducers/index'

export const store = createStore(reducer, {}, compose(applyMiddleware(thunk)))