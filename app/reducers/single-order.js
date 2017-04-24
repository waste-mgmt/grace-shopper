import axios from 'axios';

// #### INITIAL STATE #### //

const initialSelectedOrderState = {}


// #### REDUCER #### //

export default function (state = initialSelectedOrderState, action) {

  switch (action.type) {

    case SET_ORDER:
      return action.order;
      break;

    default:
      return state;
  }
  
};


// #### CONSTANTS #### //

// admin and auth'd user actions
const SET_ORDER = 'SET_ORDER';


// #### DISPATCHERS #### //

// use this dispatcher when pulling orders from the state and setting the above state with it.
export const retrieveOrder = order => ({
  type: SET_ORDER, order
});


// #### THUNKS #### //

// Admin & auth'd user action: selects one order from the database
export const getOrder = orderId => {
  return dispatch => {
    return axios.get(`/api/orders/${orderId}`)
      .then(res => {
        dispatch(retrieveOrder(res.data))
      })
  };
};

// Admin, auth'd user, and guest action: update one order
export const putOrder = (orderId, orderDetails) => {
  return dispatch => {
    return axios.put(`/api/orders/${orderId}`, orderDetails) // updates the order in the database
      .then(res => {
        return axios.get(`/api/orders/${res.data.id}`) // queries the database, returning updated order
          .then(res => {
            dispatch(retrieveOrder(res.data)); // dispatches to update the state with updated order
          });
      });
  };
};

// Admin, auth'd user, and guest action: create new order
export const postOrder = orderDetails => {
  return dispatch => {
    return axios.post(`/api/orders`, orderDetails) // creates new row in database
      .then(res => {
        return axios.get(`/api/orders/${res.data.id}`) // queries the database, returning created order
          .then(res => {
            dispatch(retrieveOrder(res.data)); // dispatches to update the state with created order
          })
      });
  }
};