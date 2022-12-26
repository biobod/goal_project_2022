import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useQuery, gql } from '@apollo/client'

import UserContext, { User } from '../contexts/UserContext'
import { styled } from '@mui/material/styles'
import { SIGN_IN } from '../constants/routePaths'

type ProtectedPageProps = {
    component: React.ReactElement
}
type responseType = {
    verifyToken: User
}

const Progress = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: '20%',
    justifyContent: 'center',
})

const GET_USER_BY_TOKEN = gql`
    query verifyToken {
        verifyToken {
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

const ProtectedPage = ({ component }: ProtectedPageProps) => {
    const { user, updateUser } = useContext(UserContext)

    const onCompleted = ({ verifyToken }: responseType) => {
        console.log('SUer =', verifyToken)
        updateUser({ ...verifyToken })
    }

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
