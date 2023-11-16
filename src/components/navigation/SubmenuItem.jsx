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

const SubMenuItem = ({ section }) => {
  const [open, setOpen] = useState(false)

  const { subMenu } = section

  const onHandleClick = () => {
    setOpen(!open)
  }

  const showExpand = length => {
    if (length === 0) return
    return open ? <ExpandLess /> : <ExpandMore />
  }

  return (
    <>
      <ListItemButton key={section.key} sx={{ pl: 2 }} onClick={onHandleClick}>
        <ListItemIcon>{section.icon}</ListItemIcon>
        <ListItemText
          primary={section.title}
          primaryTypographyProps={{
            className: `font-GMX text-gray ${
              subMenu.length !== 0 ? 'font-semibold' : ''
            }`,
          }}
        />
        {showExpand(subMenu.length)}
      </ListItemButton>
      {subMenu.length !== 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenu.map(subsection => (
              <ListItemButton sx={{ pl: 2 }} key={subsection.key}>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                  primary={subsection.title}
                  primaryTypographyProps={{
                    className: 'font-GMX font-base text-gray',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default SubMenuItem
