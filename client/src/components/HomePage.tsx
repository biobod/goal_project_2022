import React, {useContext} from 'react';
import HeroCard from './HeroCard';
import { styled } from '@mui/material/styles'
import UserContext from "../contexts/UserContext";

const CardWrapper = styled('div')({
    display: 'inline-grid',
    gridAutoFlow: 'column',
    margin: 20,
    gap: 20
})
const HomePage = () => {
    const { user } = useContext(UserContext)
    if(!user) {
        return null
    }

    const renderCards = () => {
        const { statistic, personages } = user
        const cardsCount = +statistic.level + 1
        const cards = []
        for(let i = 0; i < cardsCount; i++){
            cards.push(<HeroCard key={i} personage={personages?.[i]} />)
        }
        return cards
    }

    return (
        <CardWrapper>
            {renderCards()}
        </CardWrapper>
    );
};

export default HomePage;
