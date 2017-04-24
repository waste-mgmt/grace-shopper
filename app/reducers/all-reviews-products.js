import axios from 'axios';


// #### INITIAL STATE #### //

const initialReviewsProductsState = [];


// #### REDUCER #### // 

export default function (state = initialReviewsProductsState, action) {

  switch (action.type) {

    case RECEIVE_PRODUCT_REVIEWS:
      return action.productReviews;
      break;

    default:
      return state;

  }

};


// #### CONSTANTS #### //

const RECEIVE_PRODUCT_REVIEWS = 'RECEIVE_PRODUCT_REVIEWS';


// #### DISPATCHERS #### //

// puts all reviews associated with _one product_ on the state
export const receiveReviews = productReviews => ({
  type: RECEIVE_PRODUCT_REVIEWS, productReviews
});


// #### THUNKS #### // 

// gets all reviews associated with _one product_ from the database
export const getReviews = productId => {
  return dispatch => {
    return axios.get(`/api/products/${productId}`)
      .then(res => {
        let reviews = res.data.getReviews()
        dispatch(receiveReviews(reviews));
      });
  }
};