import React from 'react'
import { connect } from 'react-redux'

export class AllUsers extends React.Component {
  render () {
    return (
      <div>
        <ul className="list-unstyled">
          {
            this.props.AllUsers.map(user => {
              return (
                <div key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <p>{user.firstName + ' ' + user.lastName}</p>
                    <p>{user.email}</p>
                    <img src={user.photo} />
                  </Link>
                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({allUsers: state.allUsers})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
