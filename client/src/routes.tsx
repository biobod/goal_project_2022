import { Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/HomePage'

export default function () {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}