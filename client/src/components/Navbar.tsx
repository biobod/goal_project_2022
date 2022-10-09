import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import UserContext, { UserContextType } from '../contexts/UserContext'
import axios from 'axios'
import paths from '../../../common/paths'
import { AUTH_ROUTES } from '../../../common/authUrls'

const { SIGN_IN, SIGN_UP } = AUTH_ROUTES

function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
}

function stringAvatar(name: string) {
    const wordsInName = name.split(' ')
    const firsLetters = wordsInName.map((w) => w[0].toUpperCase()).join('')
    return {
        sx: {
            bgcolor: stringToColor(name),
            color: 'white',
        },
        children: firsLetters,
    }
}

const Navbar = () => {
    const navigate = useNavigate()
    const { user, updateUser } = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const onLogout = async () => {
        try {
            await axios({
                url: paths.SIGNOUT,
                withCredentials: true,
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
            })
            updateUser(null)
            handleClose()
        } catch (error) {
            console.error(error)
        }
    }

    const goToLogin = () => navigate(SIGN_IN)
    const goToSignUp = () => navigate(SIGN_UP)

    console.log({ user })
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Super Game
                    </Typography>
                    {user?.nickname && (
                        <>
                            <Tooltip title={user.nickname}>
                                <Avatar
                                    {...stringAvatar('user?.nickname')}
                                    id="basic-button"
                                    onClick={handleClick}
                                    component="button"
                                />
                            </Tooltip>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={onLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}

                    {!user && (
                        <>
                            <Button onClick={goToLogin}>Login</Button>
                            <Button onClick={goToSignUp}>Sign Up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
