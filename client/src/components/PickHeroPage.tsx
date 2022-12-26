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
import { styled } from '@mui/material/styles' // eslint-disable-line

const characters = [
    { type: 'Defender', image: defender, description: 'Defender has a good armor and health. Can stay alive in hard battles' },
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
    { type: 'Mage', image: mage, description: 'Mage uses and practices magic derived from supernatural sources to defeat enemies' },
    { type: 'Assassin', image: assasin, description: 'Exclusive murder. Has a deadly hits' },
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
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",

})

const PickHeroPage = () => {
    const [selected, onSelect] = useState<string | null>(null)

    return (
        <Container container sx={12}>
            <CardsWrapper>
                {characters.map(({ type, image, description }) => {
                    const isSelected = selected === type
                    return (
                        <Card sx={{ maxWidth: 280 }} isSelected={isSelected}>
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
            <ConfirmWrapper>
            <Button variant="contained" color='secondary' disabled={!selected}>Confirm</Button>
            </ConfirmWrapper>
        </Container>
    )
}

export default PickHeroPage
