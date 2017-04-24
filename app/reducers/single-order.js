import axios from 'axios';

// #### INITIAL STATE #### //

const initialSelectedOrderState = {}

// NOTES ON INITIAL STATE:
// (1) it may be useful to keep recently created and updated orders on the state, so that a user can update orders in the same session that the order was made and avoid having to make axios requests just to achieve the same result
// (2) it may also be useful to distinguish between `allOrders` and `allUserOrders`. *Admins* can access *all* users, but regular users can only access their order history. Perhaps we do not want to serve up all user order data to ordinary users. Besides, we have back-end routes for serving up all orders and orders for specific users;

// #### REDUCER #### //

export default function (state = initialSelectedOrderState, action) {
  switch (action.type) {
    case SELECT_ORDER:
      return action.selectedOrder;
      break;
    default:
      return state;
  }
};

// #### CONSTANTS #### //
// admin and auth'd user actions
const SELECT_ORDER = 'SELECT_ORDER';

// #### DISPATCHERS #### //
// selects one specific order from the state
export const selectOrder = selectedOrder => ({
  type: SELECT_ORDER, selectedOrder
});

// #### THUNKS #### //
// Admin & auth'd user action: selects one order from state
export const selectOneOrder = orderId => {
  return dispatch => {
    return axios.get(`/api/orders/${orderId}`)
      .then(res => {
        dispatch(selectOrder(res.data))
      })
  }
  // loop through `allOrders` array and pick the object that matches what we pass in as a function
  // take the matching item and dispatch it to the `selectUserOrder` action creator:
  // pseudocode: `return stateElement.filter(order => {order.identifier === orderIdentifer})`
  // the `stateElement` is one of two arrays on the state (**if** we opt to distinguish between auth states and admin states)
}

