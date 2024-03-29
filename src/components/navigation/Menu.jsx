import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { useHttpClient } from '@/hooks/useHttpClient'

import { List } from '@mui/material'
import Icons from '@/assets/icons'

import MenuItem from './MenuItem'

const Menu = ({ openMenu, setOpenMenu, configuration }) => {
  const { profile } = useAuthStore()
  const { sendRequest, isLoading } = useHttpClient()
  const [menu, setMenu] = useState([])

  useEffect(() => {
    if (!profile) return
    //console.log(profile)
    getMenu()
  }, [])

  const getMenu = async () => {
    const url = `/api/configuration/menu-user/${profile?.id}`
    try {
      const res = await sendRequest(url)
      if (res.success) {
        //console.log('paso', res.result.data)
        setMenu(res.result.data)
      } else {
      }
    } catch (error) {
      //console.log('error', error)
      // showErrorMessage()
    }
  }

  return (
    <div
      className={`w-full sm:w-72 h-screen bg-white shadow-[2px_3px_9px_0px_rgba(0,0,0,0.1)] overflow-y-auto t-ease z-50 ${
        openMenu ? '' : 'hide_menu'
      }`}>
      <div className="flex flex-col ">
        <section
          className="flex justify-between items-center h-14 px-5 text-merino "
          style={{ backgroundColor: configuration.color }}>
          <h1 className="font-GMX text-2xl ">Menu</h1>

          <Icons.Close
            onClick={() => setOpenMenu(false)}
            className="cursor-pointer"
          />
        </section>
        <section className="bg-bigDipORuby h-1"></section>
      </div>

      <nav>
        <List>
          {menu.map(section => (
            <MenuItem key={section.key} section={section} />
          ))}
        </List>
      </nav>
    </div>
  )
}

export default Menu
