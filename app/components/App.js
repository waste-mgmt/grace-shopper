import React, {Component} from 'react';
import Navbar from './Navbar';
import Jokes from './Jokes'
import Login from './Login'
import Footer from './Footer'

export default function App ({children}) {
	return (
		<div>
			<Navbar /> 
			<Login /> 
			{children}
			<Footer /> 
		</div>
	)
}

