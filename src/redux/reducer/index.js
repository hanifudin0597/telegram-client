import { combineReducers } from 'redux'
import listUserReducer from './listUser'
import detailUserReducer from './detailUser'
import detailProfile from './detailProfile'

const rootReducers = combineReducers({
  listUser: listUserReducer,
  detailUser: detailUserReducer,
  detailProfilePeople: detailProfile
})

export default rootReducers
