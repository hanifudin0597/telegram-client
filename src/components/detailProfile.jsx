import React, { useEffect } from 'react'
// import photoUser from '../assets/images/user-example.png'
import styleProfile from '../assets/styles/Editprofile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { detailProfilePeople } from '../redux/action/user'

export default function detailProfile () {
  const dispatch = useDispatch()

  const detailProfile = useSelector((state) => {
    return state.detailProfilePeople
  })

  //   console.log(detailProfile)

  useEffect(() => {
    const receiver = JSON.parse(localStorage.getItem('receiver'))
    dispatch(detailProfilePeople(receiver.id))
  }, [dispatch])

  return (
    <div className="d-flex flex-column border-right">
      {
        detailProfile
          ? (
            <>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {
                  detailProfile.data.photo
                    ? (
                     <img className={styleProfile.photoProfile} style={{ width: '80px', height: '80px' }} src={`${process.env.REACT_APP_API_URL}/${detailProfile.data.photo}`} alt="" />
                      )
                    : (
                       <img className={styleProfile.photoProfile} style={{ width: '80px', height: '80px' }} src={`${process.env.REACT_APP_API_URL}/user.png`} alt="" />
                      )
                }

              </div>
              <div className='d-flex flex-column' style={{ marginLeft: '30px', fontSize: '20px' }}>
                <label style={{ fontWeight: 'bold', marginTop: '10px' }} htmlFor="">{ detailProfile.data.username}</label>
                <label style={{ marginTop: '5px' }} className='' htmlFor="">online</label>
                <label style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', marginTop: '10px' }} htmlFor=""> phone number</label>
                <label style={{ fontSize: '18px', marginTop: '5px' }} htmlFor="">{ detailProfile.data.phone}</label>
              </div>
            </>
            )
          : (
            <div>Loading</div>
            )
      }

    </div>

  )
}
