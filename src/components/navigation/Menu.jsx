'use client'
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { useHttpClient } from '@/hooks/useHttpClient'

import { List } from '@mui/material'
import Icons from '@/assets/icons'

import { NAVIGATION_CONFIG } from '@/configuration/navigation/navigation.config'
import MenuItem from './MenuItem'

const Menu = ({ openMenu, setOpenMenu }) => {
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const [menu, setMenu] = useState([])

  useEffect(() => {
    getMenu()
  }, [])

  const getMenu = async () => {
    const url = `http://34.29.98.230:3002/api/configuration/menu-user/${profile.email}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        console.log('paso', res.result.data)
        setMenu(res.result.data)
      } else {
      }
    } catch (error) {
      console.log('error', error)
      // showErrorMessage()
    }
  }

  return (
    <div
      className={`w-full sm:w-64 h-screen bg-white shadow-[2px_3px_9px_0px_rgba(0,0,0,0.1)] overflow-y-auto t-ease z-40 ${
        openMenu ? '' : 'hide_menu'
      }`}>
      <div className="flex flex-col ">
        <section className="flex justify-between items-center h-14 px-5 bg-blueDianne text-merino ">
          <h1 className="font-GMX text-2xl ">Menu</h1>

          <Icons.Close
            onClick={() => setOpenMenu(false)}
            className="cursor-pointer"
          />
        </section>
        <section className="bg-bigDipORuby h-1"></section>
      </div>

      <nav>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {menu.map(section => (
            <MenuItem key={section.key} section={section}>
              <MenuItem />
            </MenuItem>
          ))}
        </List>
      </nav>
    </div>
  )
}

export default Menu
