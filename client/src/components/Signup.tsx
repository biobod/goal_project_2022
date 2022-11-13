import React, { useState, useContext, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CustomizedSnackbar from './CustomizedSnackbar'
import UserContext from '../contexts/UserContext'
import { HOME } from '../constants/routePaths'

type createUser = {
    nickname: string
    id: string
}
type responseType = {
    createUser: createUser
}

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
const validatePassword = (password: string) =>
    String(password).match(PASSWORD_REGEX)
const validateNickname = (nickname: string) => nickname.length > 3

const VALIDATORS = {
    email: validateEmail,
    password: validatePassword,
    nickname: validateNickname,
}
const CREATE_USER = gql`
    mutation createUser(
        $email: String!
        $password: String!
        $nickname: String!
    ) {
        createUser(email: $email, password: $password, nickname: $nickname) {
            id
            nickname
        }
    }
`

const Signup = () => {
    const navigate = useNavigate()
    const { user, updateUser } = useContext(UserContext)

    const [responseError, setResponseError] = useState('')
    const [validationError, setValidationError] = useState('')
    const [userIsSigned, setUserIsSigned] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
    })
    const onError = (e: Error) => setResponseError(e.message)
    const onCompleted = ({ createUser: { id, nickname } }: responseType) => {
        updateUser({ id, nickname })
        setUserIsSigned(true)
    }

    const [signUp] = useMutation(CREATE_USER, { onError, onCompleted })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        if (responseError) {
            setResponseError('')
        }
        if (validationError) {
            setValidationError('')
        }
        setFormData({ ...formData, [name]: value })
    }
    const validation = () => {
        for (const [name, value] of Object.entries(formData)) {
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
            timer = setTimeout(() => navigate(HOME, { replace: true }), 2000)
        }
        return () => clearTimeout(timer)
    }, [user])

    const onSignUp2 = async () => {
        const valid = validation()
        if (!valid) {
            return
        }
        await signUp({ variables: { ...formData } })
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
                    value={formData.nickname}
                    autoComplete="off"
                />
                <TextField
                    name="email"
                    label="Email"
                    onChange={onChange}
                    value={formData.email}
                    autoComplete="off"
                />
                <TextField
                    name="password"
                    label="Password"
                    onChange={onChange}
                    type="password"
                    value={formData.password}
                    autoComplete="off"
                />
                {(responseError || validationError) && (
                    <Typography className="error-message">
                        {responseError || validationError}
                    </Typography>
                )}
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={onSignUp2}
                >
                    Sign Up
                </Button>
            </Form>
        </>
    )
}

export default Signup
