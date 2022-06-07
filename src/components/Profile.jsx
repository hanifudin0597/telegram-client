import React, { useEffect, useState } from 'react'
// import photoUser from '../assets/images/user-example.png'
import styleProfile from '../assets/styles/Editprofile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { detailUser, updatePhoto } from '../redux/action/user'
import { Link } from 'react-router-dom'
import editBuuton from '../assets/icons/editButton.svg'
import Swal from 'sweetalert2'

export default function Profile () {
  const dispatch = useDispatch()
  const [photo, setPhoto] = useState('')
  const [isChangePhoto, setIsChangePhoto] = useState(false)
  const detailProfile = useSelector((state) => {
    return state.detailUser
  })

  useEffect(() => {
    dispatch(detailUser())
  }, [dispatch])

  const handleChangeImage = async () => {
    const formData = new FormData()
    formData.append('photo', photo)
    updatePhoto(formData)
      .then((result) => {
        Swal.fire({
          title: 'Success',
          text: 'update photo succes',
          icon: 'success'
        })
        dispatch(detailUser())
      })
      .catch(() => {
        Swal.fire({
          title: 'failed',
          text: 'update photo failed',
          icon: 'failed'
        })
      })
  }

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

                 <div className='d-flex justify-content-center align-items-center w-100' >
                    <img src={editBuuton} />
                    <label htmlFor="files" >Edit photo</label>
                    <input className="hidden" hidden type="file" id="files" onChange={(e) => {
                      setPhoto(e.target.files[0])
                      setIsChangePhoto(true)
                    }} />
                </div>
                {isChangePhoto && <button style={{ backgroundColor: 'white', borderRadius: '5px', width: '60px', marginTop: '10px' }} onClick={handleChangeImage} type="submit" >Save</button>}
                <label style={{ fontWeight: 'bold', marginBottom: '20px', marginTop: '10px' }} htmlFor="">{detailProfile.data.username}</label>
                <label style={{}} htmlFor="">{detailProfile.data.email}</label>
              </div>
              <div style={{ marginLeft: '30px', marginTop: '30px' }} className='d-flex flex-column justify-content-left align-items-left'>
                <label style={{ fontWeight: 'bold' }} htmlFor="">Account</label>
                <input className={styleProfile.inputType} placeholder='nomor telephone' value={detailProfile.data.phone} type="text" />
                <Link to='' style={{ textDecoration: 'none', color: '#7E98DF', marginTop: '10px' }} >
                  Tap to change phone number
                </Link>
                {/* <input className={styleProfile.inputTypeBio} placeholder='Bio' type="text" /> */}
                {/* <textarea className={styleProfile.inputTypeBio} name="" id="" cols="30" rows="10" value={detailProfile.data.bio}></textarea> */}
                <label style={{ marginTop: '30px', fontWeight: 'bold', marginBottom: '10px' }} htmlFor="">{detailProfile.data.bio}</label>
                <label htmlFor="">Bio</label>
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
