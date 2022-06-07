/* eslint-disable linebreak-style */
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import rootReducers from './reducer/index'

// const persistedReducer = persistReducer(persistConfig, rootReducers)
const middleware = [thunk]
// eslint-disable-next-line import/no-mutable-exports
const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
)

export { store }
