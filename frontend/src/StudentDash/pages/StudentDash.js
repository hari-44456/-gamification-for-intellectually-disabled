import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';

const useStyles = makeStyles((theme) => ({
    info: {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
    },
}));

export default function StudentDash(){
    const classes = useStyles();
   

    return(
        <React.Fragment>
            <Row>
                <Col md={4} className={classes.info}>
                    <Row>
                        <Col>
                            <StudentInfo />
                        </Col>
                    </Row>
                </Col>
                <Col md={8} align='left'>
                    <Row>
                        <Col>
                            <GraphReport />
                            <GraphReport />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}