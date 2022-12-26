import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useQuery } from '@apollo/client'

import UserContext, { User } from '../contexts/UserContext'
import CharactersContext, { Character } from '../contexts/CharactersContext'

import { styled } from '@mui/material/styles'
import { SIGN_IN } from '../constants/routePaths'
import { GET_USER_BY_TOKEN, GET_CHARACTERS } from '../queries'

type ProtectedPageProps = {
    component: React.ReactElement
}
type responseType = {
    verifyToken: User
}
type responseCharactersType = {
    getCharacters: [Character]
}
const Progress = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: '20%',
    justifyContent: 'center',
})

const ProtectedPage = ({ component }: ProtectedPageProps) => {
    const { user, updateUser } = useContext(UserContext);
    const { updateCharactersData } = useContext(CharactersContext);

    const onCompletedFetchCharacters = ({getCharacters,}: responseCharactersType) => updateCharactersData(getCharacters)
    useQuery(GET_CHARACTERS, { onCompleted: onCompletedFetchCharacters })


    const onCompleted = ({ verifyToken }: responseType) => updateUser({ ...verifyToken })

    const { loading } = useQuery(GET_USER_BY_TOKEN, {
        onCompleted,
        fetchPolicy: 'network-only',
    })

    if (loading) {
        return (
            <Progress>
                <CircularProgress color="secondary" size={100} />
            </Progress>
        )
    }
    if (user) {
        return component
    }

    return <Navigate to={SIGN_IN} replace />
}

export default ProtectedPage
