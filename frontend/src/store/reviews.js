import csrfFetch from "./csrf";

const RECEIVE_REVIEW = "reviews/receiveReview";
const RECEIVE_REVIEWS = "reviews/receiveReviews";
const REMOVE_REVIEW = "reviews/removeReview";

export const getListingReviews = (listingId) => (state) => {
  const listingReviews = Object.values(state.reviews).filter(
    (review) => review.listingId === listingId
  );
  return listingReviews;
};

export const receiveReview = (review) => {
  return {
    type: RECEIVE_REVIEW,
    review,
  };
};

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    reviews,
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};

export const fetchReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data.review));
  } else {
    throw res;
  }

  return res;
};

export const fetchListingReviews = (listingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReviews(data.reviews));
  } else {
    throw res;
  }

  return res;
};

export const createReview = (review) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/reservations/${review.reservationId}/reviews`,
    {
      method: "POST",
      body: JSON.stringify({ review: review }),
    }
  );
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data.review));
  } else {
    throw res;
  }

  return res;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
  } else {
    throw res;
  }

  return res;
};

const reviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case RECEIVE_REVIEWS:
      return { ...newState, ...action.reviews };
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
