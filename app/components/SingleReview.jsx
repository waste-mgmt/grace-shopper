import React from 'react';
import { connect } from 'react-redux';

export const SingleReview = props => {
  const review = props.selectedReview;

  return (
    <div key={review.id}>
      {
        review && review.map(col => {
          return (
            <div>
              <h3>col.title</h3>
              <p>col.rating</p>
              <p>col.content</p>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({selectedReview: state.selectedReview});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleReview);