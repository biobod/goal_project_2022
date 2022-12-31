import React, {useContext, useMemo} from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Personage } from '../contexts/UserContext'
import plusImage from '../../public/images/plus.jpg'
import { PICK_HERO, FIGHT } from '../constants/routePaths'
import CharactersContext from '../contexts/CharactersContext'
import FighterContext from '../contexts/FighterContext'

import { characters } from '../constants/characters'

type HeroCardProps = {
    personage: Personage
}

const HeroCard = ({ personage }: HeroCardProps) => {
    const { charactersData } = useContext(CharactersContext)
    const { updateFighter } = useContext(FighterContext)

    const navigate = useNavigate()

    const character = useMemo( () => (charactersData || []).find(
        ({ id }) => id === personage.characterId
    ), [personage, charactersData])

    const getImage = () => {
        if (!personage) {
            return { image: plusImage, alt: 'add hero' }
        }
        const { name } = character || {}
        return { image: characters[name].image, alt: name }
    }

    const onAction = () => {
        if (personage) {
            updateFighter({
                ...personage,
                type: character.name,
                physical_defence: character.physical_defence,
                magical_defence: character.magical_defence,
                life_points: character.life_points,
                accuracy: character.accuracy,
                evasion: character.evasion,
                critical_chance: character.critical_chance,
                hit_power: character.hit_power,
                image: characters[character.name].image
            })
            navigate(FIGHT)
        } else {
            navigate(PICK_HERO)
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
                        You are able to select a Hero!
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onAction}>
                    {personage ? 'Fight' : 'Pick your fighter'}
                </Button>
            </CardActions>
        </Card>
    )
}

export default HeroCard
