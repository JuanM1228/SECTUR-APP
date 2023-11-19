'use client'
import React from 'react'

import Image from 'next/image'
import { Avatar } from '@mui/material'

import { Menu } from '@mui/icons-material'
import Images from '@/assets/images'

const Header = ({ setOpenMenu, openMenu }) => {
  return (
    <header className="flex flex-col t-ease">
      <div className=" flex justify-between items-center h-14 bg-blueDianne px-6 ">
        <section className="flex items-center gap-6">
          <Menu
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
          <h6 className="text-merino font-GMX font-bold hidden sm:block">
            Juan Manuel Herrera
          </h6>
          <Avatar src="https://pbs.twimg.com/media/Dr-HXjWVYAEYHNM.jpg" />
        </section>
      </div>
      <section className="bg-bigDipORuby h-1"></section>
    </header>
  )
}

export default Header
