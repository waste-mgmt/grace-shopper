import React from 'react'
import { connect } from 'react-redux';

export const SingleUser = props => {
  const currentUser = props.currentUser;

  const userDetails = () => (
    <div>
      <h1>User Details</h1>
      <h3>{currentUser.fullName}</h3>
      <img src={currentUser.photo}/>
      <h3>Email:</h3>
      <p>{currentUser.email}</p>
      <h3>Address:</h3>
      <p>{currentUser.houseNumber}</p>
      <p>{currentUser.addressLine1}</p>
      {currentUser.addressLine2 ? <p>{currentUser.addressLine2}</p> : null}
    </div>
  )

  const userUpdateForm = () => (

  )

  return (
    <div key={currentUser.id}>
      {

      }
    </div>
  )
}

const mapStateToProps = state => ({currentUser: state.currentUser, selectedUser: state.selectedUser});
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);