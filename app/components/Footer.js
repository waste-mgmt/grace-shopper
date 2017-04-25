import React from 'react';
import {Link} from 'react-router';

export const Footer = () => {
	return (
    <div className="container-fluid">
      <div className="row">
				<hr />
				<ul>
					<Link to='/contactUs'style={{cursor: "pointer"}}>Contact Us  </Link>
					<i className="fa fa-2x fa-facebook-square" style={{cursor: "pointer"}}></i>
	        <i className="fa fa-2x fa-twitter-square" style={{cursor: "pointer"}}></i>
	        <i className="fa fa-2x fa-google-plus-square" style={{cursor: "pointer"}}></i>
				</ul>
			</div>
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