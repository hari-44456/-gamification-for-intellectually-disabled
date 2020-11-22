import React,{useEffect,useContext} from 'react';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TokenContext} from '../../context/TokenContext';
import {useHistory} from 'react-router-dom';

// Needed for onClick
// http://stackoverflow.com/a/34015469/988941


const MuiTheme = () => {

  const [token, setToken] = useContext(TokenContext);
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

//ReactDOM.render(<MuiTheme />, document.getElementById('root'));
export default MuiTheme;