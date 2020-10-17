import React from 'react';
import Card from './Card/Cards';
import G4 from './G4/src/index';
import './index.css';
import MuiTheme from './G1/src/index';
import Index from './G2/src/index';
import {Route,Switch} from 'react-router-dom';

import StudentLogin from './auth/pages/StudentLogin';
import AdminLogin from './auth/pages/AdminLogin'
import TeacherLogin from './auth/pages/TeacherLogin';
import StudentRegister from './auth/pages/StudentRegister';
import TeacherRegister from './auth/pages/TeacherRegister';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
	return (
		<div className="App">
			<Switch>
					<Route path="/" component={Card} exact />
					<Route path="/G1" component={MuiTheme} />
					<Route path="/G2" component={Index}/>
					<Route path="/G4" component={G4}/>
					<Route exact path='/auth/login/student/' component={StudentLogin} />

					<Route exact path='/auth/login/admin/' component={AdminLogin} />

					<Route exact path='/auth/login/teacher/' component={TeacherLogin} />

					<Route exact path='/register/student' component={StudentRegister} />

					<Route exact path='/register/teacher' component={TeacherRegister} />
			</Switch>
		</div>
	);
}

export default App;
