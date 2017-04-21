import React from 'react'
import { connect } from 'react-redux'

// should this be dummy or smart ?
export class AllUsers extends React.Component {
  render () {
    return (
      <div>
          {
            this.props.AllUsers && this.props.AllUsers.map(user => {
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
      </div>
    )
  }
}

const mapStateToProps = state => ({allUsers: state.allUsers})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
