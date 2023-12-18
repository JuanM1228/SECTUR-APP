'use client'
import React from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { Avatar } from '@mui/material'

import Icons from '@/assets/icons'
import Images from '@/assets/images'

const Header = ({ setOpenMenu, openMenu }) => {
  const { profile } = useAuthStore()
  const router = useRouter()
  return (
    <header className="flex flex-col t-ease sticky top-0 z-30">
      <div className=" flex justify-between items-center h-14 bg-blueDianne px-6 ">
        <section className="flex items-center gap-6">
          <Icons.Menu
            className="cursor-pointer text-merino"
            onClick={() => setOpenMenu(!openMenu)}
          />
          <Image
            src={Images.logoSECTURWhite}
            className={`h-20 w-44 t-ease ${openMenu ? 'push_logo' : ''}`}
            alt="logo"
          />
        </section>
        <section className="flex justify-center items-center gap-6">
          {/* <p className="font-GMX text-white">{`${profile.name} ${profile.paternalSurname}`}</p> */}
          <Avatar
            src="https://pbs.twimg.com/media/Dr-HXjWVYAEYHNM.jpg"
            // alt={profile.name}
          />
          <div onClick={() => router.push(`/`)}>
            <Icons.ExitToApp className="text-white cursor-pointer" />
          </div>
        </section>
      </div>
      <section className="bg-bigDipORuby h-1"></section>
    </header>
  )
}

export default Header
