import React, { useContext } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Personage } from '../contexts/UserContext'
import plusImage from '../../public/images/plus.jpg' // eslint-disable-line
import { PICK_HERO } from '../constants/routePaths'
import CharactersContext from '../contexts/CharactersContext'

import { characters } from '../constants/characters'

type HeroCardProps = {
    personage: Personage
}

const HeroCard = ({ personage }: HeroCardProps) => {
    const { charactersData } = useContext(CharactersContext)

    const navigate = useNavigate()
    console.log({ personage })
    const goToPickPage = () => navigate(PICK_HERO)

    const getImage = () => {
        if (!personage) {
            return { image: plusImage, alt: 'add hero' }
        }
        const name = charactersData.find(
            ({ id }) => id === personage.characterId
        )?.name
        return {
            image: characters.find((c) => c.type === name).image,
            alt: name,
        }
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="300" {...getImage()} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {personage?.name || 'Select a Hero'}
                </Typography>
                {personage ? (
                    <>
                        <Typography variant="body2" color="text.secondary">
                            Wins: {personage.wins}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Defeats: {personage.defeats}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total battles: {personage.battles}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        You are able to select a Hero. Pick wisely!
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={goToPickPage}>
                    {personage ? 'Fight' : 'Pick your fighter'}
                </Button>
            </CardActions>
        </Card>
    )
}

export default HeroCard
