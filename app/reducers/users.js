import axios from 'axios';

// ##### INITIAL STATE   ####//

const initialUserState = {
  allUsers: [],
  currentUser: {},
  selectedUser: {},
  destroyedUser: []
};

// NOTES ON INITIAL STATE:
// (1) `currentUser` is the user that is logged in
      // when a user logs in, this field is populated;
      // when a user logs out, this field is cleared;
// (2) `allUsers` is populated only when an *admin* requests information for all users.
// (3) `selectedUser` is a field populated only by admin actions: it selects a user (other than the admin) to be updated or destroyed
// (4) it may be useful to keep a record of deleted users on the state: `destroyedUser` is an array of ids of users an admin destroyed; the indexes are kept on state (and the destroyed users kept in `allUsers`) in case the admin wishes to reverse the decision during the same logged-in session


// #### REDUCER #### //

const reducer = (state=initialUserState, action) => {

  const newState = Object.assign({}, state) ;

  switch (action.type) {
    
    case RECEIVE_ALL_USERS: 
      newState.allUsers = action.allUsers;
      break;

    case SELECT_USER: 
      newState.selectedUser = action.selectedUser;

    case CREATE_USER:
      newState.allUsers = newState.allUsers.push(action.createUser);
      break;

    case DESTROY_USER: 
      newState.destroyedUser = newState.destroyedUser.push(action.id)

    default: 
      return newState;
  }

  return newState;

}

// #### CONSTANTS #### //

// exclusive admin actions
const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
const SELECT_USER = 'SELECT_USER';
// authorized user actions
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const DESTROY_USER = 'DESTROY_USER'; 
// admin and guest user actions
const CREATE_USER = 'CREATE_USER';

// #### DISPATCHERS #### //

export const receiveUsers = allUsers => ({
  type: RECEIVE_ALL_USERS, allUsers
})

export const receiveUser = oneUser => ({
  type: SET_CURRENT_USER, oneUser
})

export const selectUser = oneUser => ({
  type: SELECT_USER, oneUser
})

export const createUse = createdUser => ({
  type: CREATE_USER, createdUser
})

export const destroyUser = userId => ({
  type: DESTROY_USER, userId
})

// #### THUNKS #### // 

// receives all users from the database
export const getUsers = () => {
  return dispatch => {
    return axios.get(`/api/users`)
      .then(res => {
        dispatch(receiveUsers(res.data));
      });
  }
};

// receive one specific user from the state
export const getUser = userId => {
  return dispatch => {
    return axios.get(`/api/users/${userId}`)
      .then(res => {
        dispatch(receiveUser(res.data));
      });
  };
};

// creates new user in the database; new user added to state
export const postUser = userDetails => {
  return dispatch => {
    return axios.post(`/api/users`, userDetails)
      .then(res => {
        dispatch(createUser(res.data));
      });
  };
};

// selects one user from the state
export const selectOneUser = (userId, allUsers) => {
  return dispatch => {
    let user;
    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].id === userId) {
        user = allUsers[i];
        break;
      };
    };
    dispatch(selectUser(user));
  };
};

// updates user in the database; state likewise updated
export const putUser = (userId, userDetails, currentUser) => {
  // case where user _self-updates_
  if(currentUser.id === userId) { // 
    return axios.put(`/api/users/${userId}`, userDetails)
      .then(res => {
        // call getUse, which makes an axios request to the database for the one user, and then repopulates the `currentUser` field
        dispatch(getUser(res.data.id));
      });
  }
  // case where admin wishes to update users other than itself
  else {
    return axios.put(`/api/users/${userId}`, userDetails)
      .then( () => {
        // get getUsers, which makes an axios request for all users, repopulates the 'allUsers' field
        dispatch(getUsers())
      });
  };
};

// removes a user from the database
export const deleteUser = userId => {
  return dispatch => {
    return axios.delete(`/api/users/${userId}`)
      .then(()=> {
        dispatch(destroyUser(userId));
      });
  };
};