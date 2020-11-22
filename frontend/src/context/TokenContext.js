import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
	const [token, setToken] = useLocalStorage(null, null);
	return (
		<TokenContext.Provider value={[token, setToken]}>
			{children}
		</TokenContext.Provider>
	);
};
