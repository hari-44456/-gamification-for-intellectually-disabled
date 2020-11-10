import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { Avatar, Card, makeStyles, Typography } from '@material-ui/core';

import PersonImage from '../../assets/img/person-outline.png';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

export default function StudentInfo(){
    const classes = useStyles();
    return(
        <Card style={{padding:'10px'}}>
            <Row>
                <Col align='center'>
                    <Avatar className={classes.large} src={PersonImage} alt='person-image'/>
                </Col>
            </Row>
            <Row>
                <Col align='left'>
                    <Row>
                        <Col md={3}>
                            <Typography variant='h6'>
                                Name:-
                            </Typography>
                        </Col>
                        <Col md={9}>
                            <Typography variant='h6'>
                                Narahari Anandkumar Papshetwar
                            </Typography>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col align='left'>
                    <Row>
                        <Col md={3}>
                            <Typography variant='h6'>
                                ID:-
                            </Typography>
                        </Col>
                        <Col md={9}>
                            <Typography variant='h6'>
                                2018BTECS00012
                            </Typography>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col align='left'>
                    <Row>
                        <Col md={3}>
                            <Typography variant='h6'>
                                DOB:- 
                            </Typography>
                        </Col>
                        <Col md={9}>
                            <Typography variant='h6'>
                                12/12/2000
                            </Typography>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card  >
    )
}
