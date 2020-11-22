import React, { Component,useContext } from 'react';
import Game from './Game';
import {TokenContext} from '../../context/TokenContext';

export default function App() {
	const [token,setToken]=useContext(TokenContext);

	return (
		<Game token={token}/>
	)
}
