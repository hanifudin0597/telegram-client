import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/Forgotpassword'
import Chat from '../pages/Chat'

function PrivateRoute ({ children }) {
  const user = JSON.parse(localStorage.getItem('user'))

  // const token = user.jwt || ''
  const token = (user !== null) ? user.jwt : ''
  if (token) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

// function PublicRoute ({ children }) {
//   const token = localStorage.getItem('user')

//   if (!token) {
//     return children
//   }
//   return <Navigate to="/" />
// }

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* <Route path="/chat" element={<PrivateRoute> <Chat /></PrivateRoute>} /> */}
        <Route
          path={'/chat'}
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default router
