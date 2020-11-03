import React from 'react';
import { Button, Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    card: {
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.1)'
        },
        margin: theme.spacing(3),
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
}))

const GameCard = (props) =>{
    const classes = useStyles();
    return (
        <Card raised className={classes.card}>
            <CardMedia className={classes.media} image={props.imgsrc}/>
            <CardContent>
                <Row>
                    <Col align='center'>
                        <Typography variant="h4">
                            {props.title}
                        </Typography>
                    </Col>
                </Row>
                <Typography variant="body1" color="textSecondary">
                    Game that tells about you
                </Typography>
                <Button variant='outlined'>
                    <Link to={props.path}>Play Now</Link>
                </Button>
            </CardContent>
        </Card>
    );
 };

 export default GameCard;
