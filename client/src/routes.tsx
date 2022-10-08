import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedHomePage from './components/ProtectedHomePage'
import { AUTH_ROUTES } from '../../common/authUrls'

const { SIGN_IN, SIGN_UP } = AUTH_ROUTES

export default function () {
    return (
        <Routes>
            <Route path="/" element={<ProtectedHomePage />} />
            <Route path={SIGN_IN} element={<Login />} />
            <Route path={SIGN_UP} element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
