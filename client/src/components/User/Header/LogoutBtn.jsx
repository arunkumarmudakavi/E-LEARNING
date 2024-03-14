import React from 'react'
import { useDispatch } from 'react-redux'
import { httpUserLogout } from '../../../hooks/userRequest'
import { userLogout } from '../../../features/authSlice'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        httpUserLogout()
        .then(() => {
            dispatch(userLogout())
            navigate('/login')
        })
    }
  return (
    <button className='text-lg' onClick={() => logoutHandler()}>Logout</button>
  )
}

export default LogoutBtn