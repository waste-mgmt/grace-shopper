import axios from 'axios';

// #### INITIAL STATE #### //

const initialSelectedReviewState = {}


// #### REDUCER #### //

export default function (state = initialSelectedReviewState, action) {

  switch (action.type) {

    case SET_REVIEW:
      return action.review;
      break;

    default:
      return state;
  }
  
};


// #### CONSTANTS #### //

// admin and auth'd user actions
const SET_REVIEW = 'SET_REVIEW';


// #### DISPATCHERS #### //

// use this dispatcher when pulling reviews from the state and setting the above state with it.
export const retrieveReview = review => ({
  type: SET_REVIEW, review
});


// #### THUNKS #### //

// gets review from the database
export const getReview = reviewId => {
  return dispatch => {
    return axios.get(`/api/reviews/${reviewId}`)
      .then(res => {
        dispatch(retrieveReview(res.data))
      })
  };
};

// updates review in database
export const putReview = (reviewId, reviewDetails) => {
  return dispatch => {
    return axios.put(`/api/reviews/${reviewId}`, reviewDetails) // updates the review in the database
      .then(res => {
        return axios.get(`/api/reviews/${res.data.id}`) // queries the database, returning updated review
          .then(res => {
            dispatch(retrieveReview(res.data)); // dispatches to update the state with updated review
          });
      });
  };
};

// creates new review in database
export const postReview = reviewDetails => {
  return dispatch => {
    return axios.post(`/api/reviews`, reviewDetails) // creates new row in database
      .then(res => {
        return axios.get(`/api/reviews/${res.data.id}`) // queries the database, returning created review
          .then(res => {
            dispatch(retrieveReview(res.data)); // dispatches to update the state with created review
          })
      });
  }
};