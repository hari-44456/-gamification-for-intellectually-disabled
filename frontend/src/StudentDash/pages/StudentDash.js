import React ,{useEffect,useContext} from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';

import {TokenContext} from '../../context/TokenContext';

const useStyles = makeStyles(() => ({
    info: {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
    },
}));

export default function StudentDash(){
    const classes = useStyles();
    const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at student dashboard', token);

		if (!token || token.type !== 'student') history.push('/login/student');
	});

	const handleLogout = () => {
		axios({
			method: 'get',
			url: 'https://narahariapi.herokuapp.com/api/auth/student/logout',
			headers: {
				'auth-token': token.tokenValue,
			},
		})
			.then((res) => {
				console.log(res);
				setToken({ type: null, value: null });
			})
			.catch((err) => console.log(err));
	};

    return(
        <Row>
            <button onClick={handleLogout}>Logout</button>

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
    );
}