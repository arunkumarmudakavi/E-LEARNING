import React from 'react'
import { useDispatch } from 'react-redux'
import { httpUserLogout } from '../../../hooks/userRequest'
import { userLogout } from '../../../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        httpUserLogout()
        .then(() => {
            dispatch(userLogout())
        })
    }
  return (
    <button onClick={() => logoutHandler()}>Logout</button>
  )
}

export default LogoutBtn