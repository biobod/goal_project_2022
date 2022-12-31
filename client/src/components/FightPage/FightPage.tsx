import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { faker } from '@faker-js/faker'

import FighterContext, { Fighter } from '../../contexts/FighterContext'
import { useNavigate } from 'react-router-dom'
import { HOME } from '../../constants/routePaths'
import fightIcon from '../../../public/images/fight-icon.jpeg'
import FighterBlock from './FighterBlock'
import getRandomIndex from '../../utils/getRandomIndex'

import { Button, Box } from '@mui/material'
import CharactersContext from '../../contexts/CharactersContext'
import { characters } from '../../constants/characters'

const Wrapper = styled('div')({
    margin: 20,
    display: 'flex',
    justifyContent: 'space-between',
})
const FightPage = () => {
    const navigate = useNavigate()
    const [oppositeFighter, setOppositeFighter] = useState<Fighter | null>(null)
    const [block, setBlock] = useState(null)
    const [hit, setHit] = useState(null)
    const { fighter } = useContext(FighterContext)
    const { charactersData } = useContext(CharactersContext)

    useEffect(() => {
        const randomFighter = {
            ...charactersData[getRandomIndex()],
        }
        const { name: type } = randomFighter
        randomFighter.type = type
        randomFighter.name = faker.internet.userName()
        randomFighter.image = characters[randomFighter.type].image

        setOppositeFighter(randomFighter)
    }, [])

    console.log({oppositeFighter, fighter})


    useEffect(() => {
        if (!fighter) {
            navigate(HOME)
        }
    }, [fighter])
    if (!fighter) {
        return null
    }

    return (
        <div>
            <Wrapper>
                <FighterBlock
                    fighter={fighter}
                    setBlock={setBlock}
                    setHit={setHit}
                />
                <Box alignItems="center" justifyContent="center" display="flex">
                    <img width={100} height={100} src={fightIcon} />
                </Box>
                {oppositeFighter && (
                    <FighterBlock fighter={oppositeFighter} isEnemy />
                )}
            </Wrapper>
            <Box alignItems="center" justifyContent="center" display="flex">
                <Button color="secondary" size="large" variant="contained">
                    HIT
                </Button>
            </Box>
        </div>
    )
}

export default FightPage
