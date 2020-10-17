import React,{Component}from 'react';
import {Container} from '@material-ui/core';
import {Row,Col} from 'react-bootstrap';

import Card from './CardsUI';

import img1 from '../assert/1.jpg';
import img2 from '../assert/2.jpg';
import img3 from '../assert/3.jpg';
import img4 from '../assert/4.jpg';
class Cards extends Component{
    render(){
        return(
            <div>
                <h1>Student DashBoard</h1>
                <Container>
                    <Row>
                        <Col md={6} align='center'>
                            <Card imgsrc={img1} title="Fluid Reasoning" path="/G1"/>
                        </Col>
                        <Col md={6} align='center'>
                            <Card imgsrc={img2} title="Quantatitive Reasoning" path="/G2"/>
                        </Col>
                        <Col md={6} align='center'>
                            <Card imgsrc={img3} title="Visual-Spatial Processing" path="/G3"/> 
                        </Col>
                        <Col md={6} align='center'>
                            <Card imgsrc={img4} title="Working Memory" path="/G4"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Cards;