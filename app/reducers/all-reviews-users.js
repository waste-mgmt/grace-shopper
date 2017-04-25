import axios from 'axios';


// #### INITIAL STATE #### //

const initialReviewsUsersState = [];


// #### REDUCER #### // 

export default function (state = initialReviewsUsersState, action) {

  switch (action.type) {

    case RECEIVE_USER_REVIEWS:
      return action.userReviews;
      break; // OB/DY: can drop break if you `return`

    default:
      return state;

  }

};


// #### CONSTANTS #### //

const RECEIVE_USER_REVIEWS = 'RECEIVE_USER_REVIEWS';


// #### DISPATCHERS #### //

// puts all reviews associated with _one user_ on the state
export const receiveReviews = userReviews => ({
  type: RECEIVE_USER_REVIEWS, userReviews
});


// #### THUNKS #### // 

// gets all reviews associated with _one user_ from the database
export const getReviews = userId => {
  return dispatch => {
    return axios.get(`/api/users/${userId}`)
      .then(res => {
        let reviews = res.data.getReviews() // OB/DY: this should error
        dispatch(receiveReviews(reviews));
      });
  }
};