import React,{useEffect,useContext} from 'react';
import {Row,Col} from 'react-bootstrap';
import { Avatar, Card, makeStyles, Typography } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import axios from '../../axios';
import {TokenContext} from '../../context/TokenContext';
import PersonImage from '../../assets/img/person-outline.png';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

export default function StudentInfo({ studentId }) {
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
			url: '/api/auth/student/logout',
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
        <Card style={{padding:'10px'}}>
            <Row>
                <Col align='center'>
                    <div style={{display:'flex',flexDirection:'row-reverse'}}>
                        <button onClick={handleLogout} style={{marginLeft:'15px',width:'20%',padding:0}} >LogOut</button>
                        <button onClick={()=>history.push('/')} style={{ padding:0,width:'20%' }}>Play Games</button>
                    </div>
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
                                Student Name
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
                                {studentId}
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
