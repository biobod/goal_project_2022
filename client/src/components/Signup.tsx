import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CustomizedSnackbar from './CustomizedSnackbar'
import UserContext, {UserContextType} from '../contexts/UserContext'
import paths from '../../../common/paths'

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
const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(EMAIL_REGEX)
}
const validatePassword = (password: string) => String(password).match(PASSWORD_REGEX)
const validateNickname = (nickname: string) => nickname.length > 3

const VALIDATORS = {
    email: validateEmail,
    password: validatePassword,
    nickname: validateNickname,
}

const Signup = () => {
    const navigate = useNavigate()
    const { user, updateUser } = useContext(UserContext)

    const [responseError, setResponseError] = useState('')
    const [validationError, setValidationError] = useState('')
    const [userIsSigned, setUserIsSigned] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: '',
        nickname: '',
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        if (responseError) {
            setResponseError('')
        }
        if (validationError) {
            setValidationError('')
        }
        setData({ ...data, [name]: value })
    }
    const validation = () => {
        for (const [name, value] of Object.entries(data)) {
            const isValid = VALIDATORS[name](value)
            if (!isValid) {
                setValidationError(`The ${name} is not valid`)
                return false
            }
        }
        return true
    }
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (user) {
            timer = setTimeout(() => navigate('/', { replace: true }), 1000)
        }
        return () => clearTimeout(timer)
    }, [user])

    const onSignUp = async () => {
        const valid = validation()
        if (!valid) {
            return
        }
        try {
            const { data: userData } = await axios({
                url: paths.SIGNUP,
                method: 'post',
                withCredentials: true,
                data,
                headers: { 'Content-Type': 'application/json' },
            })
            setUserIsSigned(true)
            updateUser(userData)
        } catch (error) {
            setResponseError(
                error.response?.data?.message ||
                    error.response?.statusText ||
                    error.message
            )
        }
    }

    return (
        <>
            <CustomizedSnackbar
                message="You successfully registered!"
                type="success"
                isOpen={userIsSigned}
            />
            <Form>
                <TextField
                    name="nickname"
                    label="Nickname"
                    onChange={onChange}
                    value={data.nickname}
                />
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
                {(responseError || validationError) && (
                    <Typography className="error-message">
                        {responseError || validationError}
                    </Typography>
                )}
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={onSignUp}
                >
                    Sign Up
                </Button>
            </Form>
        </>
    )
}

export default Signup
