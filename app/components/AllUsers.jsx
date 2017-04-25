import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';


export class AllUsers extends React.Component {

  render () {
    return (
      <div className="container">
         <div className="row">
          {
            this.props.allUsers && this.props.allUsers.map(user => {
              return (
                <div key={user.id} className="col-md-4">
                  <Link to={`/users/${user.id}`}>
                    <p>{user.firstName + ' ' + user.lastName}</p>
                    <p>{user.email}</p>
                    <img src={user.photo} />
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({allUsers: state.allUsers})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
