import React, { useEffect, useContext } from 'react';
import { TokenContext } from './TokenContext';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {
	const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at admin dashboard', token);
		if (!token) history.push('/login/admin');
	});
	return (
		<div>
			<h1>Admin Dashboard</h1>
			{token}
		</div>
	);
};

export default AdminDashboard;
