import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Box from '@mui/material/Box'
import UserContext from './contexts/UserContext'
import UserDataContext from './contexts/UserDataContext'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f5f5f5',
        },
        secondary: {
            main: '#26a69a',
        },
    },
})

const App = () => {
    const [user, updateUser] = useState(null)
    const [userData, updateUserData] = useState(null)

    const userState = { user, updateUser }
    const userDataState = { userData, updateUserData }
    console.log({ userData })
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <UserContext.Provider value={userState}>
                    <UserDataContext.Provider value={userDataState}>
                        <Box>
                            <Navbar />
                            {routes()}
                        </Box>
                    </UserDataContext.Provider>
                </UserContext.Provider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
