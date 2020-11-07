import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from './context/TokenContext';
import { useHistory } from 'react-router-dom';

const TeacherDashboard = () => {
	const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at teacher dashboard', token);

		if (!token || token.type !== 'teacher') history.push('/login/teacher');
	});

	const handleLogout = () => {
		axios({
			method: 'get',
			url: 'https://narahariapi.herokuapp.com/api/auth/teacher/logout',
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

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>

			<h1>Teacher Dashboard</h1>
			{JSON.stringify(token)}
		</div>
	);
};

export default TeacherDashboard;
