import axios from 'axios';

// #### INITIAL STATE ####

const initialAllUserOrdersState = []


// #### REDUCER #### //

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

// admin & auth'd users actions
const RECEIVE_USER_ORDERS = 'RECEIVE_USER_ORDERS';


// #### DISPATCHERS ####

// updates the state with all orders _for one logged-in user_ (admin or auth'd user)
const receiveUserOrders = allUserOrders => ({
  type: RECEIVE_USER_ORDERS, allUserOrders
});


// #### THUNKS ####

// gets all orders _for one logged-in user_ (admin or auth'd user)
const getUserOrders = userId => {
  return dispatch => {
    return axios.get(`/api/users/${userId}/orders`)
      .then(res => {
        dispatch(receiveUserOrders(res.data));
      });
  };
};

