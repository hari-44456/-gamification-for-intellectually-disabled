import React, { useEffect, useContext } from 'react';
import { TokenContext } from './context/TokenContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
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

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
			<h1>Student Dashboard</h1>
			{JSON.stringify(token)}
		</div>
	);
};

export default StudentDashboard;
