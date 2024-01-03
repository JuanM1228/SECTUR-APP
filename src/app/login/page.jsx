'use client'
import React, { useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import SingIn from '@/components/login/SingIn'
import Register from '@/components/login/Register'
import Button from '@/components/common/Button'

const Login = () => {
  const router = useRouter()
  const [showRegister, setShowRegister] = useState(false)
  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)
  return (
    <div className="h-screen flex flex-col justify-center items-start sm:items-center">
      <SingIn setShowRegister={setShowRegister} showRegister={showRegister} />
      <Register setShowRegister={setShowRegister} showRegister={showRegister} />
      <Button
        content="regresar"
        onClick={() => router.push('/')}
        fullWidth={false}
      />
    </div>
  )
}

export default Login
