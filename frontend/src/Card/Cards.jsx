import React,{Component}from 'react';
import {Container, Typography} from '@material-ui/core';
import {Row,Col} from 'react-bootstrap';

import CardsUI from './CardsUI';

import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpg';
import img3 from '../assets/img/3.jpg';
import img4 from '../assets/img/4.jpg';
class Cards extends Component{
    render(){
        return(
            <React.Fragment>
                <Typography variant='h2'>
                    Student Dashboard
                </Typography>
                <Container>
                    <Row>
                        <Col md={{span:5, offset:1}} align='center'>
                            <CardsUI imgsrc={img1} title="Fluid Reasoning" path="/G1"/>
                        </Col>
                        <Col md={5} align='center'>
                            <CardsUI imgsrc={img2} title="Quantatitive Reasoning" path="/G2"/>
                        </Col>
                        <Col md={{span:5, offset:1}} align='center'>
                            <CardsUI imgsrc={img3} title="Visual-Spatial Processing" path="/G3"/> 
                        </Col>
                        <Col md={5} align='center'>
                            <CardsUI imgsrc={img4} title="Working Memory" path="/G4"/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
export default Cards;