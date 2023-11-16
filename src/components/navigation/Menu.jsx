import React from 'react'

import { List } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'

import { NAVIGATION_CONFIG } from '@/configuration/navigation/navigation.config'
import MenuItem from './MenuItem'

const Menu = ({ openMenu, setOpenMenu }) => {
  return (
    <div
      className={`w-full sm:w-64 h-screen bg-white shadow-[2px_3px_9px_0px_rgba(0,0,0,0.1)] overflow-y-auto t-ease z-10 ${
        openMenu ? '' : 'hide_menu'
      }`}>
      <div className="flex flex-col ">
        <section className="flex justify-between items-center h-14 px-5 bg-blueDianne text-merino ">
          <h1 className="font-GMX text-2xl ">Menu</h1>
          <ArrowBackIos
            onClick={() => setOpenMenu(false)}
            className="cursor-pointer"
          />
        </section>
        <section className="bg-bigDipORuby h-1"></section>
      </div>

      <nav>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {NAVIGATION_CONFIG.map(section => (
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
