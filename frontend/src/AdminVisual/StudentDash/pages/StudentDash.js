import React, { useEffect, useContext } from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';
import { TokenContext } from './context/TokenContext';
import { useHistory } from 'react-router-dom';
import axios from '../../../config';

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
		console.log('token at admin dashboard', token);

		if (!token || token.type !== 'admin') history.push('/login/admin');
	});

	const handleLogout = () => {
		axios({
			method: 'get',
			url: 'api/auth/admin/logout',
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