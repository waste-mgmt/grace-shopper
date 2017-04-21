import axios from 'axios';

// #### INITIAL STATE #### //

const initialOrderState = {
  allOrders: [],
  allUserOrders: [],
  selectedOrder: {}
};

// NOTES ON INITIAL STATE: 
// (1) it may be useful to keep recently created and updated orders on the state, so that a user can update orders in the same session that the order was made and avoid having to make axios requests just to achieve the same result
// (2) it may also be useful to distinguish between `allOrders` and `allUserOrders`. *Admins* can access *all* users, but regular users can only access their order history. Perhaps we do not want to serve up all user order data to ordinary users. Besides, we have back-end routes for serving up all orders and orders for specific users;

// #### REDUCER #### // 

const reducer = (state=initialOrderState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_ALL_ORDERS:
      newState.allOrders = action.allOrders;
      break;

    case SELECT_ORDER: 
      newState.selectedOrder = action.selectedOrder;
      break;

    case RECEIVE_USER_ORDERS:
      newState.allUserOrders = action.allUserOrders;
      break;

    case CREATE_ORDER: 
      newState.createdOrders = newState.allUserOrders.push(action.createOrder);
      break;

    case UPDATE_ORDER:
      // for the logic of this action, see the comments for the `putOrder` dispatcher below;
      newState.updatedOrders = newState.updatedOrders[action.orderIndex](action.updatedOrder);
      break;

    default:
      return newState;

  }

  return newState;

};

// #### CONSTANTS #### //

// exclusive admin actions
const RECEIVE_ALL_ORDERS = 'RECEIVE_ALL_ORDERS';
// authorized users actions
const RECEIVE_USER_ORDERS = 'RECEIVE_USER_ORDERS';
// admin and auth'd user actions
const SELECT_ORDER = 'SELECT_ORDER';
// actions for admins, users, and guests
const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

// #### DISPATCHERS #### //

// receives all orders from the database
export const receiveOrders = allOrders => ({
  type: RECEIVE_ALL_ORDERS, allOrders
});

// selects one specific order from the state
export const selectOrder = selectedOrder => ({
  type: SELECT_ORDER, selectedOrder
});

// receives all orders for a specific user from the database
export const receiverUserOrder = allUserOrders => ({
  type: RECEIVE_USER_ORDERS, allUserOrders
});

// places newly created order on the state
export const createOrder = createOrder => ({
  type: CREATE_ORDER, createOrder
});

// updates an order on the state
export const updateOrder = (updatedOrder, orderIndex) => ({
  type: UPDATE_ORDER, {updatedOrder, i
});

// #### THUNKS #### // 

// ADMIN Action: gets all orders from DB
export const getOrders = () => {
  return dispatch => {
    return axios.get(`/api/orders`)
      .then(res => {
        dispatch(receiveOrders(res.data));
      });
  }
};

// AUTH'D USER Action: gets all *user's* orders from DB
export const getUserOrders = userId => {
  return dispatch => {
    return axios.get(`/api/users/${userId}/orders`)
      .then(res => {
        dispatch(receiverUserOrder(res.data));
      });
  }
};

// Admin & auth'd user action: selects one order from state
export const selectOneOrder = (stateElement, orderIdentifier) => {
  // loop through `allOrders` array and pick the object that matches what we pass in as a function
  // take the matching item and dispatch it to the `selectUserOrder` action creator:
  // pseudocode: `return stateElement.filter(order => {order.identifier === orderIdentifer})`
  // the `stateElement` is one of two arrays on the state (**if** we opt to distinguish between auth states and admin states)
}

// Admin, auth'd user, and guest action: create new order
export const postOrder = orderDetails => {
  return dispatch => {
    return axios.post(`/api/orders`, orderDetails)
      .then(res => {
        dispatch(createOrder(res.data));
      });
  }
};

// Admin, auth'd user, and gues action: modify new order
// this dispatch needs to do several things: 
  // (1) locate in the state the order that needs to be updated; this is done with the for-loop; hence the third argument
  // (2) make an axios request to update the specified order
  // (3) replace the order-to-be-updated (from (1) above) with the updated order (returned from (2) above)
// NOTE: this is front-end updating that admins, auth'd users, and guests can make; this is not the back-end updated that occurs when Waste-MGMT™ changes an order's status from *created* to *completed*;
export const putOrder = (orderId, orderDetails, allUserOrders) => {
  return dispatch => {
    let orderIndex;
    for (let i = 0; i <= allUserOrders.length; i++) {
      if(allUserOrders[i].id === orderId) {
        orderIndex = i;
        break;
      }
    }
    return axios.put(`/api/orders/${orderId}`, orderDetails)
      .then(res => {
        let updated = res.data;
        dispatch(updateOrder(updated, orderIndex));
      });
  }
};

export default reducer;