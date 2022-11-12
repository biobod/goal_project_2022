import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useQuery, gql } from '@apollo/client';

import UserContext from '../contexts/UserContext'
import { styled } from '@mui/material/styles'
import {AUTH_ROUTES} from "../../../common/authUrls";

type ProtectedPageProps = {
    component: React.ReactElement,
}
type verifyToken = {
    nickname: string
    id: string
}
type responseType = {
    verifyToken: verifyToken
}

const Progress = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: '20%',
    justifyContent: 'center',
});

const GET_USER_BY_TOKEN= gql`
    query verifyToken {
        verifyToken {
            id
            nickname
        }
    }
`;

const ProtectedPage = ({ component }: ProtectedPageProps) => {
    const { user, updateUser } = useContext(UserContext)

    const onCompleted = ({ verifyToken }: responseType) => {
        updateUser({ id: verifyToken.id, nickname: verifyToken.nickname })
    }

    const { loading } = useQuery(GET_USER_BY_TOKEN, { onCompleted });


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
    return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />
}

export default ProtectedPage
