import axios from 'axios'
import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
  GET_DETAIL_PROFILE_PENDING,
  GET_DETAIL_PROFILE_SUCCESS,
  GET_DETAIL_PROFILE_FAILED
} from './types'

export const getListUser = (dispatch, search) => async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))

    const token = user.jwt

    dispatch({
      type: GET_USER_PENDING,
      payload: null
    })

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user?search=${search}`, {
      headers: { token }
    })

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error
    }

    dispatch({
      type: GET_USER_FAILED,
      payload: error.message
    })
  }
}

export const detailUser = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))

    const token = user.jwt

    const id = user.id

    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null
    })

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      headers: { token }
    })

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error
    }

    dispatch({
      type: GET_DETAIL_USER_FAILED,
      payload: error.message
    })
  }
}

export const detailProfilePeople = (id) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))

    const token = user.jwt

    dispatch({
      type: GET_DETAIL_PROFILE_PENDING,
      payload: null
    })

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      headers: { token }
    })

    dispatch({
      type: GET_DETAIL_PROFILE_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error
    }

    dispatch({
      type: GET_DETAIL_PROFILE_FAILED,
      payload: error.message
    })
  }
}

export const updatePhoto = async (data) => {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const id = user.id
    const token = user.jwt

    axios.put(`${process.env.REACT_APP_API_URL}/user/${id}/photo`, data, {
      'Access-Control-Allow-Origin': true,
      headers: { token },
      'Content-Type': 'multipart/form-data'
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const updateProfile = async (data) => {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const id = user.id
    const token = user.jwt

    axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, data, {
      'Access-Control-Allow-Origin': true,
      headers: { token }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
