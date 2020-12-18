import React, { useEffect, useContext } from 'react';
import { Container, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import GameCard from '../components/GameCard';
import { TokenContext } from '../../context/TokenContext';
import { useHistory } from 'react-router-dom';

import img1 from '../../assets/img/1.jpg';
import img2 from '../../assets/img/2.jpg';
import img3 from '../../assets/img/3.jpg';
import img4 from '../../assets/img/4.jpg';

const Games = () => {
	const [token] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		if (!token.tokenValue) history.push('/login/student');
	});

	return (
		<React.Fragment>
			<Typography variant='h2'>Games</Typography>
			<Container>
				<Row>
					<Col md={6} align='center'>
						<GameCard
							imgsrc={img1}
							title='Fluid Reasoning'
							path='/G1'
						/>
					</Col>
					<Col md={6} align='center'>
						<GameCard
							imgsrc={img2}
							title='Quantatitive Reasoning'
							path='/G2'
						/>
					</Col>
					<Col md={6} align='center'>
						<GameCard
							imgsrc={img3}
							title='Visual-Spatial Processing'
							path='/G3'
						/>
					</Col>
					<Col md={6} align='center'>
						<GameCard
							imgsrc={img4}
							title='Working Memory'
							path='/G4'
						/>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};
export default Games;
