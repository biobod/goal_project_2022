import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
// @ts-ignore
import plusImage from '../../public/images/plus.jpg' // eslint-disable-line
import { PICK_HERO } from '../constants/routePaths'

const HeroCard = () => {
    const navigate = useNavigate()

    const goToPickPage = () => navigate(PICK_HERO)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="300"
                image={plusImage}
                alt="add hero"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Select a Hero
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    You are able to select a Hero. Pick wisely!
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={goToPickPage}>Pick your fighter</Button>
            </CardActions>
        </Card>
    );
};


export default HeroCard;
