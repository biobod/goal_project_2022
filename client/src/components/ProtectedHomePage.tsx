import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

import HomePage from './HomePage'
import UserContext from '../contexts/UserContext'
import paths from '../../../common/paths'
import { styled } from '@mui/material/styles'
import {AUTH_ROUTES} from "../../../common/authUrls";

const Progress = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: '20%',
    justifyContent: 'center',
})
const ProtectedHomePage = () => {
    const { user, updateUser } = useContext(UserContext)
    const [isLoading, setIsloading] = useState(!user);

    const getUser = async () => {
        setIsloading(true)
        try {
            const { data } = await axios({
                url: paths.TOKEN,
                method: 'get',
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            })

            updateUser(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsloading(false)
        }
    }
    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [])


    if (isLoading) {
        return (
            <Progress>
                <CircularProgress color="secondary" size={100} />
            </Progress>
        )
    }
    if (user) {
        return <HomePage />
    }
    return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />
}

export default ProtectedHomePage
