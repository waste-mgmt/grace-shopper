import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Navbar';
import Jokes from './Jokes'
import Login from './Login'
import Footer from './Footer'

export default function App ({children}) {
	return (
			<div>
				<Navbar />
				{children}
				<Footer />
			</div>
	)
}

