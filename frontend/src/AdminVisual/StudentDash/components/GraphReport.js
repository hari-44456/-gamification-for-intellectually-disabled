import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../../../context/TokenContext';
import { useHistory } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import Pie from './pie';
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40,2,3,4,100,6]
      }
    ]
};

export default function StudentInfo(){
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
        <React.Fragment>
             <h1>Admin Analysis</h1>
             <button onClick={handleLogout} style={{float:'right',width:'10%',padding:0}} >LogOut</button>
            <h2>Line Graph for the Games</h2>
            <Line data={data} />
            <Pie/>
        </React.Fragment>
    );
};
