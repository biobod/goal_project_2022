import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import axios from "axios";
import paths from "../../../common/paths";
import {AUTH_ROUTES} from "../../../common/authUrls";

const { SIGN_IN, SIGN_UP } = AUTH_ROUTES;


const Navbar = () => {
    const { user, updateUser } = useContext(UserContext)
    const onLogout = async () => {
        try {
            await axios({
                url: paths.SIGNOUT,
                withCredentials: true,
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
            })
            updateUser(null)
        } catch (error) {
           console.error(error)
        }
    }

    const navigate = useNavigate()
    const goToLogin = () => {
        navigate(SIGN_IN)
    }
    const goToSignUp = () => {
        navigate(SIGN_UP)
    }
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
                    {user ? (
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={goToLogin}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={goToSignUp}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
