import React from 'react';
import {Link} from 'react-router';

export const Footer = () => {
	return (
		<div>
			<hr />
			<ul>
				<li><Link to='/contactUs'>Contact Us</Link></li>
				<i className="fa fa-2x fa-facebook-square"></i>
        <i className="fa fa-2x fa-twitter-square"></i>
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
(Footer)