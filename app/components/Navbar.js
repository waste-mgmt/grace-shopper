import React from 'react';
import {Link} from 'react-router';

export const Navbar = ({props}) => {
	return (
		<div>
			<ul>
				<li><Link to='/home'>Home</Link></li>
				<li><Link to='/cart'>Cart</Link></li>
				<li><Link to='/orders'>Orders</Link></li>
				<li><Link to='/reviews'>Reviews</Link></li>
				<li><Link to='/setting'>Setting</Link></li>				
			</ul>
		</div>
		)
}


import {connect} from 'react-redux'

const mapStateToProps = state => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, 
	mapDispatchToProps)
(Navbar)