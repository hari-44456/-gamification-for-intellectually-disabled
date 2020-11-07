import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { TokenProvider } from './context/TokenContext';

ReactDOM.render(
	<TokenProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</TokenProvider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
