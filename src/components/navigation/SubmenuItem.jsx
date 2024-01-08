'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  List,
  ListItemButton,
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
      <ListItemButton key={section.key} sx={{ pl: 8 }} onClick={onHandleClick}>
        {/* <ListItemIcon>{section.icon}</ListItemIcon> */}
        <ListItemText
          primary={
            <p
              className={`font-GMX  text-gray ${
                subMenu.length !== 0 ? 'font-semibold' : ''
              }`}>
              {section.title}
            </p>
          }
        />
        {showExpand(subMenu.length)}
      </ListItemButton>
      {subMenu.length !== 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenu.map(subsection => (
              <ListItemButton sx={{ pl: 5 }} key={subsection.key}>
                <ListItemText
                  primary={
                    <p className="font-GMX  text-gray">{subsection.title}</p>
                  }
                  primaryTypographyProps={{
                    className: 'pl-10 font-GMX font-base text-gray',
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
