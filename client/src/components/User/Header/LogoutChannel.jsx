import React from 'react'
import { useDispatch } from 'react-redux'
import { httpChannelLogout } from '../../../hooks/channelRequest.js'
import { channelLogout } from '../../../features/channelAuthSlice.js'
import { useNavigate } from 'react-router-dom'

const LogoutChannel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        httpChannelLogout()
        .then(() => {
            dispatch(channelLogout())
            navigate('/login-channel')
        })
    }
  return (
    <button className='text-lg' onClick={() => logoutHandler()}>Logout</button>
  )
}

export default LogoutChannel