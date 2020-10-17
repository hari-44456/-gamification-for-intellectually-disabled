import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card/Cards';
import G4 from './G4/src/index';
import './index.css';
import MuiTheme from './G1/src/index';
import Index from './G2/src/index';
import {Route,Switch} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="App">
         <Switch>
                <Route path="/" component={Card} exact />
                <Route path="/G1" component={MuiTheme} />
                <Route path="/G2" component={Index}/>
                <Route path="/G4" component={G4}/>
          </Switch>
    </div>
  );
}

export default App;
