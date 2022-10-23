import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// @ts-ignore
import plusImage from '../../public/images/plus.jpg' // eslint-disable-line

const HeroCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="300"
                image={plusImage}
                alt="green iguana"
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
                <Button size="small">Pick your fighter</Button>
            </CardActions>
        </Card>
    );
};


export default HeroCard;
