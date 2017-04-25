import axios from 'axios'

const initialCurrentUserState = {}

export default function (state = initialCurrentUserState, action) {
  switch (action.type) {
    case SELECT_CURRENT_USER:
      return action.currentUser
    default:
      return state
  }
}

const SELECT_CURRENT_USER = 'SELECT_CURRENT_USER'

const receivingCurrentUser = currentUser => ({
  type: SELECT_CURRENT_USER,
  currentUser
})

export const setCurrentUser = userId => { // OB/DY: might be redundant with whoami action creator
  return dispatch => {
    return axios.get(`/api/users/${userId}`)
      .then(res => {
        dispatch(receivingCurrentUser(res.data))
      })
  }
}

export const updateCurrentUser = (updatedUser) => {
  return dispatch => {
    return axios.put(`/api/users/${updatedUser.id}`, updatedUser)
      .then(res => {
        dispatch(receivingCurrentUser(res.data.id));
      });
  }
}
