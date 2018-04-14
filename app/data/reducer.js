import { combineReducers } from 'redux'

import feedReducer from './feed/reducer'

export default combineReducers({
    feed: feedReducer
  })