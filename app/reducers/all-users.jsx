import axios from 'axios'

const initialAllUsersState = []

export default function (state = initialAllUsersState, action) {
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.allReceivedUsers
    default:
      return state
  }
}

const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'

const receivingAllUsers = allReceivedUsers => ({
  type: RECEIVE_ALL_USERS,
  allReceivedUsers
})

export const getUsers = () => {
  return dispatch => {
    return axios.get(`/api/users`)
      .then(res => {
        dispatch(receivingAllUsers(res.data))
      })
  }
}


