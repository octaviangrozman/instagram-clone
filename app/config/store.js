import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../data/reducer'

// let devTools = f => f;
// if (typeof window === 'object'
//   && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined') {
//   devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
// }

export default function configureStore(initialState = {}) {
    const enhancer = composeWithDevTools(
      applyMiddleware(thunk, logger),
      // devTools
    )(createStore)
  
    const store = enhancer(reducer, initialState)
  
    return store
  }