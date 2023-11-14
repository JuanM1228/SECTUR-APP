'use client'
import React, { useState } from 'react'

import SingIn from '@/components/login/SingIn'
import Register from '@/components/login/Register'

const Login = () => {
  const [showRegister, setShowRegister] = useState(false)
  return (
    <div className="h-screen flex justify-center items-start sm:items-center bg-bandera bg-cover bg-center">
      <SingIn setShowRegister={setShowRegister} showRegister={showRegister} />
      <Register setShowRegister={setShowRegister} showRegister={showRegister} />
    </div>
  )
}

export default Login
