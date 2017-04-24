import axios from 'axios';

// #### INITIAL STATE ####

const initialAllUserOrdersState = []

export default function (state=initialAllUserOrdersState, action) {
  switch (action.type) {
    case RECEIVE_USER_ORDERS:
      return action.allUserOrders;
      break;
    default:
      return state;
  }
};


// #### CONSTANTS ####
// authorized users actions
const RECEIVE_USER_ORDERS = 'RECEIVE_USER_ORDERS';


// #### DISPATCHERS ####
// receives all orders for a specific user from the database
const receiveUserOrders = allUserOrders => ({
  type: RECEIVE_USER_ORDERS, allUserOrders
});


// #### THUNKS ####
// AUTH'D USER Action: gets all *user's* orders from DB
const getUserOrders = userId => {
  return dispatch => {
    return axios.get(`/api/users/${userId}/orders`)
      .then(res => {
        dispatch(receiveUserOrders(res.data));
      });
  }
};

