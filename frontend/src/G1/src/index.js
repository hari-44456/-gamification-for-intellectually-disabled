import React from 'react';
import App from './components/App';
import levelFactory from './lib/levels-factory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onClick
// http://stackoverflow.com/a/34015469/988941


const MuiTheme = () => (
  <MuiThemeProvider>
    <App level={levelFactory(4 ** 2)} />
  </MuiThemeProvider>
);

//ReactDOM.render(<MuiTheme />, document.getElementById('root'));
export default MuiTheme;