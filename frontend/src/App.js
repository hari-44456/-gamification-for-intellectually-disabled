import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './index.css';

import Games from './Games/pages/Games';
import G1 from './G1/src/index';
import G2 from './G2/src/index';
import G3 from './G3/src/index';
import G4 from './G4/src/index';
import TeacherDashboard from './TeacherDashboard/index'
import StudentLogin from './auth/pages/StudentLogin';
import AdminLogin from './auth/pages/AdminLogin';
import TeacherLogin from './auth/pages/TeacherLogin';
import StudentRegister from './auth/pages/StudentRegister';
import TeacherRegister from './auth/pages/TeacherRegister';
import AdminView from './AdminVisual/StudentDash/components/GraphReport'


import StudentDashboard from './StudentDash/pages/StudentDash';
//import TeacherDashboard from './TeacherDashboard';
import App1 from './Flask/ui/src/index'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path="/"  component={Games}/>
				<Route path="/G1" component={G1} />
				<Route path="/G2" component={G2}/>
				<Route path="/G4" component={G4}/>
				<Route path="/G3" component={G3}/>
				
				<Route exact path='/login/student' component={StudentLogin} />
				<Route exact path='/login/teacher' component={TeacherLogin} />
				<Route exact path='/login/admin' component={AdminLogin} />

				<Route
					exact
					path='/register/teacher'
					component={TeacherRegister}
				/>

				<Route
					exact
					path='/student/dashboard'
					component={StudentDashboard}
				/>

				<Route
					exact
					path='/teacher/dashboard'
					component={TeacherDashboard}
				/>

				
				<Route
					exact
					path='/model'
					component={App1}
				/>
				<Route
					exact
					path='/admin/dashboard'
					component={AdminView }
				/>
				
			</Switch>
		</div>
	);
}

export default App;
