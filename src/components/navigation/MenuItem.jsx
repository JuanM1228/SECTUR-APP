'use client'
import React, { useState } from 'react'

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import SubMenuItem from './SubmenuItem'

const MenuItem = ({ section }) => {
  const [open, setOpen] = useState(false)

  const { subMenu } = section

  const onHandleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton key={section.key} onClick={onHandleClick}>
        <ListItemIcon>{section.icon}</ListItemIcon>
        <ListItemText
          primary={section.title}
          primaryTypographyProps={{
            className: `font-GMX text-gray ${
              subMenu.length !== 0 ? 'font-semibold' : ''
            }`,
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {subMenu.length !== 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenu.map(subsection => (
              <SubMenuItem key={subsection.key} section={subsection} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default MenuItem
