import React, { useContext, useState } from 'react'
import { useMutation, gql } from '@apollo/client'
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
import TextField from '@mui/material/TextField'
import UserContext from '../contexts/UserContext' // eslint-disable-line
import { characters } from '../constants/characters'

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

const CREATE_PERSONAGE = gql`
    mutation createPersonage($name: String!, $type: String!, $userId: String!) {
        createPersonage(name: $name, type: $type, userId: $userId) {
            id
            name
            battles
            wins
            defeats
            characterId
        }
    }
`

const PickHeroPage = () => {
    const { user, updateUser } = useContext(UserContext)
    if (!user) {
        return null
    }
    console.log({ user })
    const [selected, onSelect] = useState<string | null>(null)
    const [name, setName] = useState<string>('Rodger')
    const navigate = useNavigate()

    const goToHome = () => navigate(HOME)

    const onSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setName(value)
    }
    const onCompleted = ({ createPersonage }) => {
        updateUser({
            ...user,
            personages: [...user.personages, createPersonage],
        })
        goToHome()
    }
    const [onConfirm] = useMutation(CREATE_PERSONAGE, { onCompleted })

    const handleConfirm = () =>
        onConfirm({ variables: { userId: user.id, type: selected, name } })
    return (
        <Container component="div">
            <CardsWrapper>
                {Object.values(characters).map(({ type, image, description }) => {
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
            {selected && (
                <ConfirmWrapper>
                    <TextField
                        label="Name for your Personage"
                        onChange={onSetName}
                        value={name}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!selected}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </ConfirmWrapper>
            )}
        </Container>
    )
}

export default PickHeroPage
