'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material'
import Icons from '@/assets/icons'

const SubMenuItem = ({ section }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { subMenu } = section

  const onHandleClick = () => {
    setOpen(!open)
    console.log(section.path)
    if (section.path) {
      router.push(section.path)
    }
  }

  const showExpand = length => {
    if (length === 0) return
    return open ? <Icons.ExpandLess /> : <Icons.ExpandMore />
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
