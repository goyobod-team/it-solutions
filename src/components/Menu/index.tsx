import React from 'react'
import { Button } from '../Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Popover, SxProps, Typography } from '@mui/material'
import { createMenu } from 'src/helpers'
import Router from 'next/router'

const paperStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
  backgroundColor: 'black',
  '& h6': {
    color: 'white',
    fontWeight: '500',
    ':hover': { color: 'primary.main', cursor: 'pointer' },
  },
}

interface MenuProps {
  menu: ReturnType<typeof createMenu>
}

export function Menu(props: MenuProps) {
  const { menu } = props
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: open ? 'primary.main' : 'black', ':hover': { color: 'primary.main' } }}
      >
        <Typography variant="body1">{menu.title}</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{ sx: paperStyles }}
      >
        {menu.subMenu.map((m, i) => (
          <Typography key={i} variant="subtitle2" onClick={() => Router.push(m.link)}>
            {m.title}
          </Typography>
        ))}
      </Popover>
    </Box>
  )
}