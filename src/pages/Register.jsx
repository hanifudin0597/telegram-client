import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styleAuth from '../assets/styles/Auth.module.css'
import iconGoogle from '../assets/icons/google.svg'
import goBack from '../assets/icons/goback.svg'
import Swal from 'sweetalert2'
import { register } from '../redux/action/auth'

export default function Register () {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const onLogin = (e) => {
    e.preventDefault()
    if (form.email === '' || form.password === '' || form.username === '') {
      Swal.fire({
        title: 'error',
        text: 'input must be filled',
        icon: 'error'
      })
    } else {
      register(form)
        .then((result) => {
          if (result.code === 200) {
            Swal.fire({
              title: 'Success',
              text: `${result.message}`,
              icon: 'success'
            })
            return navigate('/')
          }
        }).catch((err) => {
          if (err.response.data.code === 500) {
            Swal.fire({
              title: 'Error',
              text: `${err.response.data.error}`,
              icon: 'error'
            })
          }
        })
    }
  }
  return (
    <div
      style={{
        backgroundColor: '#E5E5E5',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="card" style={{ width: 'auto', borderRadius: '5%' }}>
        <div className="card-body">
          <div className={styleAuth.tittle}>
            <Link to="/">
              <img className={styleAuth.goBack} src={goBack} alt="" />
            </Link>
            <h5 className={'card-title'}>Register</h5>
          </div>
          <h6 className={`card-subtitle ${styleAuth.header}`}>
            Let’s create your account!
          </h6>
          <form onSubmit={(e) => onLogin(e)}>
            <div
              className="d-flex flex-column"
              style={{ marginLeft: '50px', marginRight: '50px' }}
            >
              <label className={styleAuth.formLabel} htmlFor="">
                Name
              </label>
              <input onChange={(e) => setForm({ ...form, username: e.target.value })} className={styleAuth.formInput} type="text" />
              <label className={styleAuth.formLabel} htmlFor="">
                Email
              </label>
              <input onChange={(e) => setForm({ ...form, email: e.target.value })} className={styleAuth.formInput} type="email" />
              <label className={styleAuth.formLabel} htmlFor="">
                Password
              </label>
              <input onChange={(e) => setForm({ ...form, password: e.target.value })} className={styleAuth.formInput} type="password" />

              <button type='submit' className={styleAuth.buttonRegister}>Register</button>
              <div className="d-flex justify-content-center align-items-center">
                <hr
                  style={{
                    width: '28%',
                    marginBottom: '30px',
                    marginRight: '25px',
                    color: '#848484',
                    height: '2px'
                  }}
                />
                <label className={styleAuth.labelRegisterWith} htmlFor="">
                  Register with
                </label>
                <hr
                  style={{
                    width: '28%',
                    marginBottom: '30px',
                    marginLeft: '25px',
                    color: '#848484',
                    height: '2px'
                  }}
                />
              </div>
              <button className={styleAuth.buttonRegisterGoogle}>
                <img className={styleAuth.iconGoogle} src={iconGoogle} alt="" />
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
