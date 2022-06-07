import React from 'react'
import styleAuth from '../assets/styles/Auth.module.css'
import goBack from '../assets/icons/goback.svg'
import { Link } from 'react-router-dom'

export default function Login () {
  return (
     <div style={{ backgroundColor: '#E5E5E5', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ width: 'auto', borderRadius: '5%' }}>
              <div className="card-body">
                  <div className={styleAuth.tittle} >
                        <Link to='/login' >
                            <img className={styleAuth.goBack} src={goBack} alt="" />
                        </Link>
                    <h5 className={'card-title'} >Forgot Password</h5>
                  </div>
                  <h6 className={`card-subtitle ${styleAuth.header}`}>You’ll get messages soon on your e-mail </h6>
                  <div className="d-flex flex-column" style={{ marginLeft: '50px', marginRight: '50px' }}>
                    <label className={styleAuth.formLabel} htmlFor="">Email</label>
                    <input className={styleAuth.formInput} type="email" />

                    <button className={styleAuth.buttonRegister}>Send</button>
                  </div>
            </div>
        </div>
    </div>
  )
}
