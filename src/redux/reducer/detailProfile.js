import {
  GET_DETAIL_PROFILE_FAILED,
  GET_DETAIL_PROFILE_PENDING,
  GET_DETAIL_PROFILE_SUCCESS
} from '../action/types'

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
  pagination: null
}

const detailProfile = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_PROFILE_PENDING:
      return { ...state, isLoading: true }
    case GET_DETAIL_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        pagination: action.payload.pagination
      }
    case GET_DETAIL_PROFILE_FAILED:
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

export default detailProfile
