import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedPage from './components/ProtectedPage'
import PickHeroPage from './components/PickHeroPage'
import HomePage from './components/HomePage'
import {SIGN_UP, SIGN_IN, HOME, PICK_HERO } from './constants/routePaths'


export default function () {
    return (
        <Routes>
            <Route path={HOME} element={<ProtectedPage component={<HomePage />} />} />
            <Route
                path={PICK_HERO}
                element={<ProtectedPage component={<PickHeroPage />} />}
            />
            <Route path={SIGN_IN} element={<Login />} />
            <Route path={SIGN_UP} element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
