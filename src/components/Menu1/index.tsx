import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Popover, SxProps, Typography } from '@mui/material'
import { createMenu } from 'src/helpers'
import Router from 'next/router'
import Button from '../Button'

const paperStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
  backgroundColor: 'black',
  cursor: 'default',
  '& h6': {
    color: 'white',
    fontWeight: '500',
    ':hover': { color: 'primary.main', cursor: 'pointer' },
  },
}

interface Menu1Props {
  menu: ReturnType<typeof createMenu>
}

export default function Menu1(props: Menu1Props) {
  const { menu } = props
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : ''

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = document.getElementById(id)
    const { clientY, clientX } = e

    if (element && anchorEl) {
      const outsideButton = [
        // Inside Button Left
        clientX >= anchorEl.offsetLeft,
        // Inside Button Right
        clientX <= anchorEl.offsetLeft + anchorEl.offsetWidth,
        // Inside Button Top
        clientY >= anchorEl.offsetTop,
        // Inside Button Bottom
        clientY <= anchorEl.offsetTop + anchorEl.offsetHeight,
      ].includes(false)

      const outsideMenu = [
        // Inside Menu Left
        clientX >= element.offsetLeft,
        // Inside Menu Right
        clientX <= element.offsetLeft + element.offsetWidth,
        // Inside Menu Top
        clientY >= element.offsetTop,
        // Inside Menu Bottom
        clientY <= element.offsetTop + element.offsetHeight,
      ].includes(false)

      if (outsideButton && outsideMenu) {
        setAnchorEl(null)
      }
    }
  }

  return (
    <Box>
      <Button
        aria-describedby={id}
        variant="text"
        onMouseEnter={handleClick}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              transition: 'all .3s',
              ...(open && { transform: 'rotate(-180deg)' }),
            }}
          />
        }
        sx={{ color: open ? 'primary.main' : 'black' }}
      >
        <Typography variant="body1">{menu.title}</Typography>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onMouseMove={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ cursor: 'pointer' }}
        PaperProps={{ id, sx: paperStyles }}
      >
        {menu.subMenu.map((m, i) => (
          <Typography key={i} variant="subtitle2" onClick={() => Router.push(m.path)}>
            {m.name}
          </Typography>
        ))}
      </Popover>
    </Box>
  )
}
