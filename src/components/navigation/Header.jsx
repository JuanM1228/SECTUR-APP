'use client'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useHttpClient } from '@/hooks/useHttpClient'

import Image from 'next/image'
import { Avatar } from '@mui/material'

import Icons from '@/assets/icons'
import Images from '@/assets/images'

import Cookies from 'js-cookie'

const Header = ({ setOpenMenu, openMenu, configuration }) => {
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const router = useRouter()

  const deleteToken = () => {
    localStorage.removeItem('auth')
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <header className="flex flex-col t-ease sticky top-0 z-30 self-stretch">
      {configuration.color && (
        <div
          className={`flex justify-between items-center h-14 px-6 `}
          style={{ backgroundColor: configuration.color }}>
          <section className="flex items-center gap-6">
            <Icons.Menu
              className="cursor-pointer text-merino"
              onClick={() => setOpenMenu(!openMenu)}
            />
            <img
              src={`${process.env.ENV_URL}/${configuration.logo_path}`}
              className={`h-14 w-36 object-contain `}
              alt="logo"
              onClick={() => router.push('/')}
            />
          </section>
          <section className="flex justify-center items-center gap-6">
            {/* <p className="font-GMX text-white">{`${profile.name} ${profile.paternalSurname}`}</p> */}
            <Avatar alt={profile.name} />
            <div onClick={deleteToken}>
              <Icons.ExitToApp className="text-white cursor-pointer" />
            </div>
          </section>
        </div>
      )}
      <section className="bg-bigDipORuby h-1"></section>
    </header>
  )
}

export default Header
