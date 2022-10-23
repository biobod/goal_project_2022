import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Box from '@mui/material/Box'
import UserContext from './contexts/UserContext';

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
    const [user, updateUser] = useState(null);
    const userState = {user, updateUser}

    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <UserContext.Provider value={userState}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: '#e3e1e1',
                    }}
                >
                    <Navbar />
                    {routes()}
                </Box>
                </UserContext.Provider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
