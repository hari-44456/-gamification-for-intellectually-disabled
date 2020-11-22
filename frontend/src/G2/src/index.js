import React,{useEffect,useContext} from 'react';
import './index.css';
import App from './App';
import {TokenContext} from '../../context/TokenContext';
import {useHistory} from 'react-router-dom';

const Index=()=>{
  
  const [token, setToken] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at student dashboard', token);

		if (!token || token.type !== 'student') history.push('/login/student');
	});

    return (
      <App/>
    );
}

export default Index;
