// import React, { useState, useEffect } from 'react'
// import '../assets/styles/Chat.css'
// import Menu from '../assets/icons/menu.svg'
// import addChat from '../assets/icons/plus.svg'
// import {
//   DropdownToggle,
//   DropdownItem,
//   DropdownMenu,
//   Dropdown
// } from 'reactstrap'
// import iconSetting from '../assets/icons/setting.svg'
// import Contact from '../assets/icons/contact.svg'
// import Calls from '../assets/icons/call.svg'
// import Bookmarks from '../assets/icons/bookmark.svg'
// import inviteFriend from '../assets/icons/inviteFriend.svg'
// import FAQ from '../assets/icons/FAQ.svg'
// import { useDispatch, useSelector } from 'react-redux'
// import { getListUser } from '../redux/action/user'
// import Drawer from 'react-modern-drawer'
// import 'react-modern-drawer/dist/index.css'
// import Profile from './Profile'

// export default function Sidebar () {
//   const dispatch = useDispatch()
//   const [dropdownOpen, setOpen] = useState(false)
//   const [isOpenProfile, setIsOpenProfile] = useState(false)

//   const listUser = useSelector((state) => {
//     return state.listUser
//   })

//   useEffect(() => {
//     dispatch(getListUser(dispatch))
//   }, [dispatch])

//   const toggleDrawer = () => {
//     setIsOpenProfile((prevState) => !prevState)
//   }

//   return (
//     <div className="col-12 col-lg-5 col-xl-3 border-right">
//       <div className="px-4 d-none d-md-block">
//         <div>
//           <label
//             style={{
//               marginTop: '20px',
//               fontWeight: 'bold',
//               color: '#7E98DF',
//               fontSize: '30px'
//             }}
//             htmlFor=""
//           >
//             Telegram
//           </label>
//           <Dropdown
//             toggle={() => {
//               setOpen(!dropdownOpen)
//             }}
//             isOpen={dropdownOpen}
//             style={{ position: 'absolute', top: '32px', left: '156px' }}
//           >
//             <DropdownToggle data-toggle="dropdown" tag="span">
//               <img src={Menu} style={{ marginLeft: '141px' }} alt="" />
//             </DropdownToggle>
//             <DropdownMenu style={{ backgroundColor: '#7E98DF' }}>
//               <div className="d-flex">
//                 <img
//                   style={{ marginTop: '-10px', marginLeft: '10px' }}
//                   src={iconSetting}
//                   alt=""
//                 />
//                 <DropdownItem
//                   onClick={toggleDrawer}
//                   style={{ color: 'white', marginBottom: '10px' }}
//                 >
//                   Setting
//                 </DropdownItem>
//               </div>
//               <div className="d-flex">
//                 <img
//                   style={{ marginTop: '-10px', marginLeft: '10px' }}
//                   src={Contact}
//                   alt=""
//                 />
//                 <DropdownItem style={{ color: 'white', marginBottom: '10px' }}>
//                   Contact
//                 </DropdownItem>
//               </div>
//               <div className="d-flex">
//                 <img
//                   style={{ marginTop: '-10px', marginLeft: '6px' }}
//                   src={Calls}
//                   alt=""
//                 />
//                 <DropdownItem style={{ color: 'white', marginBottom: '10px' }}>
//                   Calls
//                 </DropdownItem>
//               </div>
//               <div className="d-flex">
//                 <img
//                   style={{
//                     marginTop: '-10px',
//                     marginLeft: '12px',
//                     marginRight: '5px'
//                   }}
//                   src={Bookmarks}
//                   alt=""
//                 />
//                 <DropdownItem style={{ color: 'white', marginBottom: '10px' }}>
//                   Save Messages
//                 </DropdownItem>
//               </div>
//               <div className="d-flex">
//                 <img
//                   style={{
//                     marginTop: '-10px',
//                     marginLeft: '10px',
//                     marginRight: '5px'
//                   }}
//                   src={inviteFriend}
//                   alt=""
//                 />
//                 <DropdownItem style={{ color: 'white', marginBottom: '10px' }}>
//                   Invite Friend
//                 </DropdownItem>
//               </div>
//               <div className="d-flex">
//                 <img
//                   style={{
//                     marginTop: '-10px',
//                     marginLeft: '10px',
//                     marginRight: '5px'
//                   }}
//                   src={FAQ}
//                   alt=""
//                 />
//                 <DropdownItem style={{ color: 'white', marginBottom: '10px' }}>
//                   FAQ
//                 </DropdownItem>
//               </div>
//             </DropdownMenu>
//           </Dropdown>
//         </div>
//         <Drawer
//           open={isOpenProfile}
//           onClose={toggleDrawer}
//           direction="left"
//           className="bla bla bla"
//           style={{ width: '335px' }}
//         >
//           <Profile />
//         </Drawer>
//         <div className="d-flex align-items-center">
//           <div className="flex-grow-1">
//             <input
//               type="text"
//               className="form-control my-3"
//               placeholder="Search..."
//             />
//           </div>
//           <img src={addChat} style={{ marginLeft: '15px' }} alt="" />
//         </div>
//       </div>
//       {listUser.isLoading
//         ? (
//         <div>Laoding</div>
//           )
//         : (
//             listUser.data.map((items, index) =>
//               items.id !== localStorage.getItem('id')
//                 ? (
//             <div key={index} className="px-3 d-none d-md-block">
//               <a
//                 href="#"
//                 className="list-group-item list-group-item-action border-0"
//                  onClick={() => selectReceiver(items)}
//               >
//                 <div className="d-flex align-items-start">
//                   {items.photo
//                     ? (
//                     <img
//                       src={`${process.env.REACT_APP_API_URL}/${items.photo}`}
//                       className="rounded-circle mr-1"
//                       width="40"
//                       height="40"
//                       style={{ marginRight: '15px' }}
//                     />
//                       )
//                     : (
//                     <img
//                       src={`${process.env.REACT_APP_API_URL}/user.png`}
//                       className="rounded-circle mr-1"
//                       width="40"
//                       height="40"
//                       style={{ marginRight: '15px' }}
//                     />
//                       )}
//                   <div className="flex-grow-1 ml-3">
//                     <label htmlFor=""> {items.username}</label>
//                     <label
//                       htmlFor=""
//                       style={{
//                         color: '#848484',
//                         position: 'absolute',
//                         right: '0px'
//                       }}
//                     >
//                       15.30
//                     </label>
//                     <div className="small" style={{ color: '#7E98DF' }}>
//                       <span className="fas fa-circle chat-online"></span> Online
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             </div>
//                   )
//                 : null
//             )
//           )}

//       <hr className="d-block d-lg-none mt-1 mb-0" />
//     </div>
//   )
// }
