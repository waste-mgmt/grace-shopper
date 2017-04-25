import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

export class UserSetting extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			firstName: '',
			lastName: '',
			email: '',
			photo: '',
			password: '',
		}
	}

	// OB/DY: crazy es6 destructuring here ({target: {name, value}}) would give you variables for `name` and `value` directly
	handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value 
    });
  }

  handleSubmit(event) {
  	// OB/DY: don't forget to preventDefault for submit events
  	// OB/DY          v BUG
  	axios.put(`/users/:${currentUser.id}`, this.state) // OB/DY: not talking to redux?
  	.then(updatedUser => {res.send(updatedUser)})
  }

	render () {
		return ( // OB/DY: inconsistent indentation
				<form onSubmit={this.handleSubmit}>
						<label>
							First Name:
							<input type="text" name="firstName" value={this.state.firstName} placeholder={currentUser.firstName} onChange={this.handleInputChange}/>
						</label>
						<br />
						<label>
							Last Name:
							<input type='text' name="lastName" value={this.state.lastName} placeholder={currentUser.lastname}onChange={this.handleInputChange} />
						</label>
						<br />
						<label>
							Email: {currentUser.email}
							<input type='text' name="email" value={this.state.email} placeholder={currentUser.email}onChange={this.handleInputChange}/>
						</label>
						<br />
						<label>
							Photo: {currentUser.photo}
							<input type='text' name="photo" value={this.state.photo} onChange={this.handleInputChange}/>
						</label>
						<br />
						<label>
							Password: {currentUser.password}
							<input type='text' name="password" value={this.state.password} onChange={this.handleInputChange}/> 
						</label>										
					<button type='submit' value="Update Info"/>
				</form>
		)
	}
}

const mapStateToProps = state => ({currentUser: state.currentUser})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting)