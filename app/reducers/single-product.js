import axios from 'axios';

// #### INITIAL STATE #### //

const initialStateSingleProduct = {};


// #### REDUCER #### //

export default function (state = initialStateSingleProduct, action) {

  switch (action.type) {

    case SET_PRODUCT:
      return action.product;

    default:
      return state;
  }

};


// #### CONSTANTS #### //

const SET_PRODUCT = 'SET_PRODUCT';


// #### DISPATCHERS #### //

export const setProduct = product => ({
  type: SET_PRODUCT, product
});

// #### THUNKS #### //

// gets product from database
export const getProduct = productId => {
  return dispatch => {
    return axios.get(`/api/products/${productId}`)
      .then(res => {
        dispatch(setProduct(res.data));
      });
  }
};