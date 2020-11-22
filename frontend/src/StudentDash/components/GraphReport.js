import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
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
function App() {
  const [appState, setAppState] = useState({
    G1:null,G2:null,G3:null,G4:null
  });

  useEffect(() => {
    setAppState({});
    const apiUrl = `https:/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(() => {
        setAppState({  });
      });
  }, [setAppState]);  
}
export default function StudentInfo(){
    return (
        <React.Fragment>
            <h2>Line Example</h2>
            <Line data={data} />
        </React.Fragment>
    );
};
