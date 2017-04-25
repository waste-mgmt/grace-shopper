// OB/DY: different naming convention for this file?
import axios from 'axios'

const initialSelectedUserState = {}

export default function (state = initialSelectedUserState, action) {
  switch (action.type) {
    case SELECT_USER:
      return action.selectedUser
    default:
      return state;
  }
}

const SELECT_USER = 'SELECT_USER'

// OB/DY: https://github.com/erikras/ducks-modular-redux
const selectOneUser = oneUser => ({
  type: SELECT_USER, oneUser
})

export const selectingOneUser = (userId) => {
  return dispatch => {
    return axios.get(`/api/users/${userId}`)
      .then(res => {
        disptach(selectOneUser(res.data))
      })
  }
}

export const updatingOneUser = (updatedUser) => {
  return dispatch => {
    return axios.put(`/api/users/${updatedUser.id}`, updatedUser)
      .then((res) => {
        dispatch(selectingOneUser(res.data.id)) // OB/DY: carry all the groceries in one trip
      });
  };
};

// removes a user from the database
export const destroyingOneUser = userId => {
  return dispatch => {
    return axios.delete(`/api/users/${userId}`)
      .then(()=> {
        dispatch(selectingOneUser({})); // OB/DY: should probably be `selectOneUser`
      });
  };
};
