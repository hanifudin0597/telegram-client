import { combineReducers } from 'redux'
import listUserReducer from './listUser'
import detailUserReducer from './detailUser'

const rootReducers = combineReducers({
  listUser: listUserReducer,
  detailUser: detailUserReducer
})

export default rootReducers
