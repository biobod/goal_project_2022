import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import UserContext, { User } from '../contexts/UserContext'
import { HOME } from '../constants/routePaths'
import { useLazyQuery, gql } from '@apollo/client'


type responseType = {
    loginUser: User
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

const LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            id
            nickname
            statistic {
                level
                current_points
            }
            personages {
                name
                battles
                wins
                defeats
                characterId
            }
        }
    }
`

const Login = () => {
    const navigate = useNavigate()
    const { updateUser } = useContext(UserContext)

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const onCompleted = ({ loginUser }: responseType) => {
        console.log({ loginUser })
        updateUser(loginUser)
        navigate(HOME, { replace: true })
    }
    const [onLogin, { error }] = useLazyQuery(LOGIN_USER, {
        onCompleted,
    })
    const handleLogin = () => onLogin({ variables: { ...loginData } })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    return (
        <Form>
            <TextField
                name="email"
                label="Email"
                onChange={onChange}
                value={loginData.email}
                autoComplete="off"
            />
            <TextField
                name="password"
                label="Password"
                onChange={onChange}
                type="password"
                value={loginData.password}
                autoComplete="off"
            />
            {error && (
                <Typography className="error-message">
                    {error?.message}
                </Typography>
            )}
            <Button color="secondary" variant="contained" onClick={handleLogin}>
                Login
            </Button>
        </Form>
    )
}

export default Login
