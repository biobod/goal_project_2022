import React from 'react';
import HeroCard from './HeroCard';
import { styled } from '@mui/material/styles'

const CardWrapper = styled('div')({
    display: 'inline-grid',
    gridAutoFlow: 'column',
    margin: 20,
    gap: 20
})
const HomePage = () => {
    return (
        <CardWrapper>
            <HeroCard  />
            <HeroCard  />
        </CardWrapper>
    );
};

export default HomePage;
