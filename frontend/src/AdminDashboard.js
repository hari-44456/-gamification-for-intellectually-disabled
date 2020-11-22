import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from './context/TokenContext';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {
	const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at admin dashboard', token);

		if (!token || token.type !== 'admin') history.push('/login/admin');
	});

	const handleLogout = () => {
		axios({
			method: 'get',
			url: 'https://narahariapi.herokuapp.com/api/auth/admin/logout',
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

			<h1>Admin Dashboard</h1>
			{JSON.stringify(token)}
		</div>
	);
};

export default AdminDashboard;
