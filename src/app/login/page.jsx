'use client'
import React, { useState } from 'react'
import { useAuthStore } from '@/store/auth'

import SingIn from '@/components/login/SingIn'
import Register from '@/components/login/Register'

const Login = () => {
  const [showRegister, setShowRegister] = useState(false)
  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)
  return (
    <div className="h-screen flex justify-center items-start sm:items-center">
      <SingIn setShowRegister={setShowRegister} showRegister={showRegister} />
      <Register setShowRegister={setShowRegister} showRegister={showRegister} />
    </div>
  )
}

export default Login
