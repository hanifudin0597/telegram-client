import axios from 'axios'

export const login = async (data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, data)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.token))
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const register = async (data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
