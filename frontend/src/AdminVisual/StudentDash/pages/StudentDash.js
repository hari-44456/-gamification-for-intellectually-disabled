import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';

const useStyles = makeStyles(() => ({
    info: {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
    },
}));

export default function StudentDash(){
    const classes = useStyles();

    return(
        <Row>
            
            <Col md={8} align='left'>
                <Row>
                    <Col>
                        <GraphReport />
                        <GraphReport />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}