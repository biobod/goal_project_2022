import React, { useState } from 'react'
import assasin from '../../public/images/characters/assasin.png'
import warrior from '../../public/images/characters/warrior.png'
import archer from '../../public/images/characters/archer.png'
import mage from '../../public/images/characters/mage.png'
import defender from '../../public/images/characters/defender.png'
import Container from '@mui/material/Container'

import MuiCard from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { HOME } from '../constants/routePaths'
import TextField from "@mui/material/TextField"; // eslint-disable-line

const characters = [
    {
        type: 'Defender',
        image: defender,
        description:
            'Defender has a good armor and health. Can stay alive in hard battles',
    },
    {
        type: 'Archer',
        image: archer,
        description:
            'An archer is a person who practices archery, using a bow to shoot arrows.',
    },
    {
        type: 'Warrior',
        image: warrior,
        description:
            'A warrior is a person specializing in combat or warfare, especially within the context ' +
            'of a tribal or clan-based warrior culture society that recognizes a separate warrior ' +
            'aristocracy, class, or caste.',
    },
    {
        type: 'Mage',
        image: mage,
        description:
            'Mage uses and practices magic derived from supernatural sources to defeat enemies',
    },
    {
        type: 'Assassin',
        image: assasin,
        description: 'Exclusive murder. Has a deadly hits',
    },
]

const CardsWrapper = styled('div')({
    display: 'inline-grid',
    gridAutoFlow: 'column',
    margin: 20,
    gap: 20,
})
const Card = styled(MuiCard)(({ isSelected }) => ({
    border: isSelected ? '5px solid #26a69a' : 'none',
    button: {
        color: isSelected && '#26a69a',
    },
}))
const ConfirmWrapper = styled('div')({
    backgroundColor: '#212121',
    gap: 20,
    borderRadius: 5,
    margin: '0 20px',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const PickHeroPage = () => {
    const [selected, onSelect] = useState<string | null>(null)
    const [name, setName] = useState<string>('Rodger')
    const navigate = useNavigate()

    const goToHome = () => navigate(HOME)

    const onSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setName(value)
    }

    return (
        <Container component="div">
            <CardsWrapper>
                {characters.map(({ type, image, description }) => {
                    const isSelected = selected === type
                    return (
                        <Card
                            sx={{ maxWidth: 280 }}
                            isSelected={isSelected}
                            key={type}
                        >
                            <CardMedia
                                component="img"
                                height="300"
                                image={image}
                                alt={type}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {type}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => onSelect(type)}
                                >
                                    {isSelected ? 'Selected' : 'Select'}
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </CardsWrapper>
            {selected && <ConfirmWrapper>
                <TextField
                    label="Name for your Personage"
                    onChange={onSetName}
                    value={name}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={!selected}
                    onClick={goToHome}
                >
                    Confirm
                </Button>
            </ConfirmWrapper>}
        </Container>
    )
}

export default PickHeroPage
