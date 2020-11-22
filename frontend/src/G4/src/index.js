import React,{useEffect,useContext} from 'react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {TokenContext} from '../../context/TokenContext';
import {useHistory} from 'react-router-dom';

const G4=()=>{
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
export default G4;
registerServiceWorker();
