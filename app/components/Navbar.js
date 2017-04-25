import React from 'react';
import {Link} from 'react-router';

import Login from './Login';

// uses one conditional and another within that to display diffferently for those not logged in, and users vs. admins
export const Navbar = (props) => {
	return (
		<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<Link to='/home' className="navbar-brand">Home</Link>
				</div>
				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav">
						<li className="active"><Link to='/cart'>Cart<span className="sr-only">(current)</span></Link></li>
					</ul>
				</div>
				{
					props.currentUser.id ? (
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><a href="#">Link</a></li>
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account Info<span className="caret"></span></a>
									<ul className="dropdown-menu">
										<li><Link to='/orders'>My Orders</Link></li>
										<li><Link to='/reviews'>My Reviews</Link></li>
										<li><Link to='/setting'>Setting</Link></li>
										{
											props.currentUser.admin ? (
												<div>
													<li role="separator" className="divider"></li>
													<li><Link to='/users'>All Users</Link></li>
													<li><Link to='/orders'>All Orders</Link></li>
												</div>
											) : (
												<div></div>
											)
										}
									</ul>
								</li>
							</ul>
						</div>
					) : (
						<Login />
					)
				}
			</div>
		</nav>
	)
}


import {connect} from 'react-redux'

const mapStateToProps = state => {
	return {
		currentUser: state.currentUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)





