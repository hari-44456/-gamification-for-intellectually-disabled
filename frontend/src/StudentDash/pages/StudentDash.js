import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';

export default function StudentDash(){
    return(
        <Row>
            <Col md={4}>
                <StudentInfo />
            </Col>
            <Col md={8} align='left'>
                <GraphReport />
            </Col>
        </Row>
    );
}