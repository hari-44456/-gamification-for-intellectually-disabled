import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/wrappers/App';
import {useHistory} from 'react-router-dom';
// Add bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect,useContext} from 'react';
// Add our style
import './assets/style/index.css';
import {TokenContext} from '../context/TokenContext';

const TeacherDashboard=()=>{
  
    const [token, setToken] = useContext(TokenContext);
      const history = useHistory();
  
      useEffect(() => {
          console.log('token at teacher  dashboard', token);
  
          if (!token || token.type !== 'student') history.push('/login/student');
      });
  
      return (
        <App/>
      );
  }
  export default TeacherDashboard;