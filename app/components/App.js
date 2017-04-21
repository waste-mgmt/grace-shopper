import React, {Component} from 'react';
import Navbar from './Navbar';
import Jokes from './Jokes'
import Login from './Login'
import AllProducts from './AllProducts'
//Inserts homepage inbetween Nav and Login 

export default function App ({children}) {
	return (
		<div>
			<Navbar /> 
			<Login /> 
			<AllProducts />
		</div>
	)
}

