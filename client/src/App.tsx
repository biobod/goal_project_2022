import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Box from '@mui/material/Box'
import UserContext from './contexts/UserContext'
import CharactersContext from './contexts/CharactersContext'
import FighterContext from './contexts/FighterContext'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f5f5f5',
        },
        secondary: {
            main: '#26a69a',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
})

const App = () => {
    const [user, updateUser] = useState(null)
    const [charactersData, updateCharactersData] = useState(null)
    const [fighter, updateFighter] = useState(null)

    const userState = { user, updateUser }
    const characters = { charactersData, updateCharactersData }
    const fighterState = { fighter, updateFighter }

    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <UserContext.Provider value={userState}>
                    <CharactersContext.Provider value={characters}>
                        <FighterContext.Provider value={fighterState}>
                            <Box>
                                <Navbar />
                                {routes()}
                            </Box>
                        </FighterContext.Provider>
                    </CharactersContext.Provider>
                </UserContext.Provider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
