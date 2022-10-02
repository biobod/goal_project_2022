import React, {useContext, useEffect, useState} from 'react'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import paths from '../../../common/paths'
import UserContext from '../contexts/UserContext'
import {useNavigate} from "react-router-dom";

const Form = styled('form')({
    backgroundColor: 'white',
    width: 300,
    margin: '10% auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    borderRadius: 6,
    color: '#424242',
    '& .error-message': {
        color: 'red',
    },
    '& label.Mui-focused': {
        color: '#424242',
    },
    '& label': {
        color: '#424242',
    },
    '& .MuiOutlinedInput-root': {
        color: '#424242',
        '& fieldset': {
            borderColor: '#bdbdbd',
        },
        '&:hover fieldset': {
            borderColor: '#bdbdbd',
        },
    },

    '&.Mui-focused fieldset': {
        borderColor: '#bdbdbd',
    },
})

const Login = () => {
    const navigate = useNavigate()
    const { user, updateUser } = useContext(UserContext)

    const [error, setError] = useState('')
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (user) {
            timer = setTimeout(() => navigate('/', { replace: true }), 1000)
        }
        return () => clearTimeout(timer)
    }, [user])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        if (error) {
            setError('')
        }
        setData({ ...data, [name]: value })
    }
    const onLogin = async () => {
        try {
            const { data: userData } = await axios({
                url: paths.LOGIN,
                method: 'post',
                withCredentials: true,
                data,
                headers: { 'Content-Type': 'application/json' },
            })
            updateUser(userData)
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    error.response?.statusText ||
                    error.message
            )
        }
    }



    return (
        <Form>
            <TextField
                name="email"
                label="Email"
                onChange={onChange}
                value={data.email}
                inputProps={{
                    autoComplete: 'new-password',
                }}
            />
            <TextField
                name="password"
                label="Password"
                onChange={onChange}
                type="password"
                value={data.password}
            />
            {error && (
                <Typography className="error-message">{error}</Typography>
            )}
            <Button color="secondary" variant="contained" onClick={onLogin}>
                Login
            </Button>
        </Form>
    )
}

export default Login
