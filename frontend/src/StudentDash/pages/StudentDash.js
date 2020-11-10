import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';

const useStyles = makeStyles((theme) => ({
    info: {
        display: 'sticky',
        top: '50%',
    },
}));

export default function StudentDash(){
    const classes = useStyles();

    return(
        <Row className={classes.info}>
            <Col md={4}>
                <StudentInfo />
            </Col>
            <Col md={8} align='left'>
                <GraphReport />
            </Col>
        </Row>
    );
}