import React, { useEffect, useState, useContext } from 'react';
import {Line} from 'react-chartjs-2';

import axios from '../../axios';
import { TokenContext } from '../../context/TokenContext';
import Loader from '../../utils/Loader';

export default function StudentInfo(){
	const [loading, setLoading] = useState(true);
	const [dates, setDates] = useState([]);
	const [scores, setScores] = useState([]);
	const [token, setToken] = useContext(TokenContext);
	const headers = {
		'auth-token': token.tokenValue,
	};

	const data = {
		labels: dates,
		datasets: [
			{
				label: 'Scores',
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
				data: scores
			}
		]
	};

	useEffect(() => {
		const tempDates = [];
		const tempScores = [];
		axios.get('/student/score',{headers})
		.then(response =>{
			var len = response.data.scores.length;
			for(var i=len-1;i>=19;i--){
				let date = response.data.scores[i].date;
				let datearr = date.split('-');
				date = datearr[1]+'/'+datearr[2]+'/'+datearr[0];
				tempDates.push(date);
				tempScores.push((response.data.scores[i].g1+response.data.scores[i].g2+response.data.scores[i].g3+response.data.scores[i].g4)/4);
			}
			tempDates.push(0);
			tempScores.push(0);
			tempDates.reverse();
			tempScores.reverse();
			setDates(tempDates);
			setScores(tempScores);
			setLoading(false);
		}, (err) => {console.log(err);console.log(token.tokenValue)});
	}, []);

	if(loading){
		return <Loader />;
	}

    return (
        <React.Fragment>
            <h2>Line Example</h2>
            <Line data={data} />
        </React.Fragment>
    );
};
