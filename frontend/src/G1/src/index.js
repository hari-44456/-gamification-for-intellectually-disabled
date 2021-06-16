import React,{useEffect,useContext} from 'react';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TokenContext} from '../../context/TokenContext';
import {useHistory} from 'react-router-dom';

const MuiTheme = () => {

  const [token] = useContext(TokenContext);
	const history = useHistory();

	useEffect(() => {
		console.log('token at student dashboard', token);

		if (!token || token.type !== 'student') history.push('/login/student');
	});

  return(
  <MuiThemeProvider>
    <App  />
  </MuiThemeProvider>
)}

export default MuiTheme;