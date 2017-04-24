import axios from 'axios';

// #### INITIAL STATE #### //

const initalAllOrdersState = []


// #### REDUCER #### //

export default function (state=initalAllOrdersState, action) {

  switch (action.type) {

    case RECEIVE_ALL_ORDERS:
      return action.allOrders;
      break;

    default:
      return state;

  }
};


// #### CONSTANTS #### //

// exclusive admin actions
const RECEIVE_ALL_ORDERS = 'RECEIVE_ALL_ORDERS';


// #### DISPATCHERS #### //

// sets the state with all orders _from all users_
export const receiveOrders = allOrders => ({
  type: RECEIVE_ALL_ORDERS, allOrders
});


// #### THUNKS #### //

// gets all orders _from all users_ from the database
export const getOrders = () => {
  return dispatch => {
    return axios.get(`/api/orders`)
      .then(res => {
        dispatch(receiveOrders(res.data));
      });
  };
};
