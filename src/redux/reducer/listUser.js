import {
  GET_USER_FAILED,
  GET_USER_PENDING,
  GET_USER_SUCCESS
} from '../action/types'

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
  pagination: null
}

const listUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
      return { ...state, isLoading: true }
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        pagination: action.payload.pagination
      }
    case GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload
      }
    default:
      return state
  }
}

export default listUserReducer
