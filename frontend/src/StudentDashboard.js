import React, { useEffect, useContext } from 'react';
import { TokenContext } from './TokenContext';
import { useHistory } from 'react-router-dom';

const StudentDashboard = () => {
	const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at student dashboard', token);
		if (!token) history.push('/login/student');
	});

	return (
		<div>
			<h1>Student Dashboard</h1>
			{token}
		</div>
	);
};

export default StudentDashboard;
