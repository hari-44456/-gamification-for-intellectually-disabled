import React, { useEffect, useContext } from 'react';
import { TokenContext } from './TokenContext';
import { useHistory } from 'react-router-dom';

const TeacherDashboard = () => {
	const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at teacher dashboard', token);
		if (!token) history.push('/login/teacher');
	});
	return (
		<div>
			<h1>Teacher Dashboard</h1>
			{token}
		</div>
	);
};

export default TeacherDashboard;
