import React, { useState, useEffect } from 'react'
import '../assets/styles/Chat.css'
// import Sidebar from '../components/Sidebar'
// import userExample from '../assets/images/user-example.png'
import profileMenu from '../assets/icons/profileMenu.svg'
import plus from '../assets/icons/plus.svg'
import emoticon from '../assets/icons/emoticon.svg'
import camera from '../assets/icons/camera.svg'
import io from 'socket.io-client'
import Menu from '../assets/icons/menu.svg'
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Dropdown
} from 'reactstrap'
import iconSetting from '../assets/icons/setting.svg'
import Contact from '../assets/icons/contact.svg'
import Calls from '../assets/icons/call.svg'
import Bookmarks from '../assets/icons/bookmark.svg'
import inviteFriend from '../assets/icons/inviteFriend.svg'
import FAQ from '../assets/icons/FAQ.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getListUser, detailProfilePeople } from '../redux/action/user'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Profile from '../components/Profile'
import DetailProfile from '../components/detailProfile'
import { useNavigate } from 'react-router-dom'
import logout from '../assets/icons/logout.svg'
import Swal from 'sweetalert2'

export default function Chat () {
  const navigate = useNavigate()
  const [socketio, setSocketio] = useState(null)
  const [listChat, setListChat] = useState([])
  const [searchName, setSearchName] = useState('')
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL)
    socket.on('send-message-response', (response) => {
      const receiver = JSON.parse(localStorage.getItem('receiver'))
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListChat(response)
      }
    })
    setSocketio(socket)
  }, [])

  const [chat, setChat] = useState('')

  const onSubmitMessage = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))
    const receiver = JSON.parse(localStorage.getItem('receiver'))

    const payload = {
      sender: user.username,
      receiver: receiver.username,
      chat
    }

    setListChat([...listChat, payload])

    const data = {
      sender: user.id,
      receiver: activeReceiver.id,
      chat
    }
    socketio.emit('send-message', data)
    setChat('')
  }
  const dispatch = useDispatch()
  const [dropdownOpen, setOpen] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const [isOpenProfile1, setIsOpenProfile1] = useState(false)

  const listUser = useSelector((state) => {
    return state.listUser
  })

  const [login, setLogin] = useState({})
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setLogin(user)
    dispatch(getListUser(dispatch, searchName))
  }, [dispatch, searchName])

  const toggleDrawer = () => {
    setIsOpenProfile((prevState) => !prevState)
  }

  const [activeReceiver, setActiveReceiver] = useState({})
  const selectReceiver = (item) => {
    setListChat([])
    setActiveReceiver(item)
    localStorage.setItem('receiver', JSON.stringify(item))
    socketio.emit('join-room', login)
    const data = {
      sender: login.id,
      receiver: item.id
    }
    socketio.emit('chat-history', data)
  }

  // search Name
  const onLogout = () => {
    localStorage.clear()
    return navigate('/')
  }

  const toggleDrawer1 = () => {
    const receiver = JSON.parse(localStorage.getItem('receiver'))
    dispatch(detailProfilePeople(receiver.id))
    setIsOpenProfile1((prevState) => !prevState)
  }

  // delete chat
  const onDeleteMessage = (items) => {
    console.log(items)
    Swal.fire({
      title: 'Are you sure to delete this message?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          sender: items.sender,
          receiver: items.receiver,
          chatId: items.id
        }
        socketio.emit('delete-message', data)
        Swal.fire(
          'Deleted!',
          'Your message has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <main className="content hanif">
      <div className="card">
        <div className="row g-0">
          <div className="col-12 col-lg-5 col-xl-3 border-right">
            <div className="px-4 d-none d-md-block">
              <div>
                <label
                  style={{
                    marginTop: '20px',
                    fontWeight: 'bold',
                    color: '#7E98DF',
                    fontSize: '30px'
                  }}
                  htmlFor=""
                >
                  Telegram
                </label>
                <Dropdown
                  toggle={() => {
                    setOpen(!dropdownOpen)
                  }}
                  isOpen={dropdownOpen}
                  style={{ position: 'absolute', top: '32px', left: '156px' }}
                >
                  <DropdownToggle data-toggle="dropdown" tag="span">
                    <img src={Menu} style={{ marginLeft: '141px' }} alt="" />
                  </DropdownToggle>
                  <DropdownMenu style={{ backgroundColor: '#7E98DF' }}>
                    <div className="d-flex">
                      <img
                        style={{ marginTop: '-10px', marginLeft: '10px' }}
                        src={iconSetting}
                        alt=""
                      />
                      <DropdownItem
                        onClick={toggleDrawer}
                        style={{ color: 'white', marginBottom: '10px' }}
                      >
                        Setting
                      </DropdownItem>
                    </div>
                    <div className="d-flex">
                      <img
                        style={{ marginTop: '-10px', marginLeft: '10px' }}
                        src={Contact}
                        alt=""
                      />
                      <DropdownItem
                        style={{ color: 'white', marginBottom: '10px' }}
                      >
                        Contact
                      </DropdownItem>
                    </div>
                    <div className="d-flex">
                      <img
                        style={{ marginTop: '-10px', marginLeft: '6px' }}
                        src={Calls}
                        alt=""
                      />
                      <DropdownItem
                        style={{ color: 'white', marginBottom: '10px' }}
                      >
                        Calls
                      </DropdownItem>
                    </div>
                    <div className="d-flex">
                      <img
                        style={{
                          marginTop: '-10px',
                          marginLeft: '12px',
                          marginRight: '5px'
                        }}
                        src={Bookmarks}
                        alt=""
                      />
                      <DropdownItem
                        style={{ color: 'white', marginBottom: '10px' }}
                      >
                        Save Messages
                      </DropdownItem>
                    </div>
                    <div className="d-flex">
                      <img
                        style={{
                          marginTop: '-10px',
                          marginLeft: '10px',
                          marginRight: '5px'
                        }}
                        src={inviteFriend}
                        alt=""
                      />
                      <DropdownItem
                        style={{ color: 'white', marginBottom: '10px' }}
                      >
                        Invite Friend
                      </DropdownItem>
                    </div>
                    <div className="d-flex">
                      <img
                        style={{
                          marginTop: '-10px',
                          marginLeft: '10px',
                          marginRight: '5px'
                        }}
                        src={FAQ}
                        alt=""
                      />
                      <DropdownItem
                        style={{ color: 'white', marginBottom: '10px' }}
                      >
                        FAQ
                      </DropdownItem>
                    </div>
                    <div className="d-flex">
                      <img
                        style={{
                          marginTop: '-10px',
                          marginLeft: '10px',
                          marginRight: '5px'
                        }}
                        src={logout}
                        alt=""
                      />
                      <DropdownItem
                        style={{ color: 'white', marginBottom: '10px' }}
                        onClick={onLogout}
                      >
                        Logout
                      </DropdownItem>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Drawer
                open={isOpenProfile}
                onClose={toggleDrawer}
                direction="left"
                className="bla bla bla"
                style={{ width: '335px' }}
              >
                <Profile />
              </Drawer>
              <form action="">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <input
                      onChange={(e) => setSearchName(e.target.value)}
                      type="text"
                      className="form-control my-3"
                      placeholder="Search..."
                      // value={searchName}
                    />
                  </div>
                  <img src={plus} style={{ marginLeft: '15px' }} alt="" />
                </div>
              </form>
            </div>
            {listUser.isLoading
              ? (
              <div>Laoding</div>
                )
              : (
                  listUser.data.map((items, index) =>
                    items.id !== login.id
                      ? (
                  <div key={index} className="px-3 d-none d-md-block">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action border-0"
                      onClick={() => selectReceiver(items)}
                    >
                      <div className="d-flex align-items-start">
                        {items.photo
                          ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${items.photo}`}
                            className="rounded-circle mr-1"
                            width="40"
                            height="40"
                            style={{ marginRight: '15px' }}
                          />
                            )
                          : (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/user.png`}
                            className="rounded-circle mr-1"
                            width="40"
                            height="40"
                            style={{ marginRight: '15px' }}
                          />
                            )}
                        <div className="flex-grow-1 ml-3">
                          <label htmlFor=""> {items.username}</label>
                          <label
                            htmlFor=""
                            style={{
                              color: '#848484',
                              position: 'absolute',
                              right: '0px'
                            }}
                          >
                            15.30
                          </label>
                          <div className="small" style={{ color: '#7E98DF' }}>
                            <span className="fas fa-circle chat-online"></span>{' '}
                            Online
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                        )
                      : null
                  )
                )}
            <hr className="d-block d-lg-none mt-1 mb-0" />
          </div>
          <div className="col-12 col-lg-7 col-xl-9 main-chat">
            {activeReceiver.username
              ? (
              <div className="py-2 px-4 d-none d-lg-block header-chat">
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                    {activeReceiver.photo
                      ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${activeReceiver.photo}`}
                        style={{ marginRight: '10px', borderRadius: '10px' }}
                        width="40"
                        height="40"
                      />
                        )
                      : (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/user.png`}
                        style={{ marginRight: '10px', borderRadius: '10px' }}
                        width="40"
                        height="40"
                      />
                        )}
                  </div>
                  <div className="flex-grow-1 pl-3">
                    <strong>{activeReceiver.username}</strong>
                    <div style={{ color: '#7E98DF' }}>Online</div>
                  </div>
                  <div>
                      <button
                        onClick={toggleDrawer1}
                        className="btn btn-light border btn-lg px-3">
                      <img src={profileMenu} width="24" height="24" alt="" />
                    </button>
                  </div>
                   <Drawer
                    open={isOpenProfile1}
                    onClose={toggleDrawer1}
                    direction="right"
                    className="bla bla bla"
                    style={{ width: '335px' }}
                  >
                    <DetailProfile />
                  </Drawer>
                </div>
              </div>
                )
              : (
              <div className="py-2 px-4 d-none d-lg-block header-chat">
                <div
                  style={{ height: '55px' }}
                  className="d-flex align-items-center py-1"
                ></div>
              </div>
                )}

            <div className="position-relative">
              {activeReceiver.username
                ? (
                <div style={{ overflow: 'auto ' }} className="chat-messages p-4">
                  {listChat.map((items, index) => (
                    <div key={index}>
                      {items.sender === login.username
                        ? (
                          // balo chat right
                        <div className="chat-message-right pb-4">
                          <div>
                            {login.photo
                              ? (
                              <img
                                src={`${process.env.REACT_APP_API_URL}/${login.photo}`}
                                className="rounded-circle mr-1"
                                width="40"
                                height="40"
                              />
                                )
                              : (
                              <img
                                src={`${process.env.REACT_APP_API_URL}/user.png`}
                                className="rounded-circle mr-1"
                                width="40"
                                height="40"
                              />
                                )}

                            <div className="text-muted small text-nowrap mt-2">
                              2:33 am
                            </div>
                          </div>
                          <div
                            style={{
                              backgroundColor: 'white',
                              color: 'black',
                              borderTopLeftRadius: '50px',
                              borderTopRightRadius: '50px',
                              borderBottomRightRadius: '8px',
                              borderBottomLeftRadius: '50px',
                              paddingTop: '20px',
                              paddingLeft: '30px',
                              paddingRight: '30px'
                            }}
                            className="flex-shrink-1 mr-3"
                          >
                              {items.chat}
                          </div>
                          <span
                              className="text-danger pointer mt-3"
                              onClick={() => onDeleteMessage(items)}
                              style={{ marginTop: '20px', marginLeft: '30px' }}
                            >
                              Delete
                          </span>
                        </div>
                          )
                        : (
                        <div className="chat-message-left pb-4">
                          <div>
                            {activeReceiver.photo
                              ? (
                              <img
                                src={`${process.env.REACT_APP_API_URL}/${activeReceiver.photo}`}
                                className="rounded-circle mr-1"
                                width="40"
                                height="40"
                              />
                                )
                              : (
                              <img
                                src={`${process.env.REACT_APP_API_URL}/user.png`}
                                className="rounded-circle mr-1"
                                width="40"
                                height="40"
                              />
                                )}

                            <div className="text-muted small text-nowrap mt-2">
                              2:34 am
                            </div>
                            </div>
                            {/* balon chat left */}
                          <div
                            style={{
                              backgroundColor: '#7E98DF',
                              color: 'white',
                              borderTopLeftRadius: '50px',
                              borderTopRightRadius: '50px',
                              borderBottomRightRadius: '50px',
                              borderBottomLeftRadius: '8px',
                              paddingTop: '20px',
                              paddingLeft: '30px',
                              paddingRight: '30px'
                            }}
                            className="flex-shrink-1 ml-3"
                          >
                            {items.chat}
                            </div>
                          <span
                              className="text-danger pointer mt-3"
                              onClick={() => onDeleteMessage(items)}
                              style={{ marginTop: '20px', marginLeft: '30px' }}
                            >
                              Delete
                          </span>
                        </div>
                          )}
                    </div>
                  ))}
                </div>
                  )
                : (
                  <div className="chat-messages p-4 d-flex justify-content-center align-items-center">
                    <label style={{ color: '#848484', fontSize: '20px' }} htmlFor="">Please select a chat to start messaging</label>
                  </div>
                  )}
            </div>
            <form onSubmit={onSubmitMessage} action="">
              <div
                style={{ backgroundColor: 'white', position: 'relative' }}
                className="input-group"
              >
                <input
                  onChange={(e) => setChat(e.target.value)}
                  value={chat}
                  style={{
                    backgroundColor: '#FAFAFA',
                    width: '20px',
                    height: '50px',
                    margin: '20px 10px 20px 30px',
                    borderRadius: '10px'
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Type your message"
                  required
                />
                <img src={plus} alt="" />
                <img
                  style={{ margin: '0px 10px 0px 10px' }}
                  src={emoticon}
                  alt=""
                />
                <img style={{ marginRight: '30px' }} src={camera} alt="" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
