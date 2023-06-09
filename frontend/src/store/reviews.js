import csrfFetch from "./csrf";

const RECEIVE_REVIEWS = "reviews/receiveReviews";

export const getListingReviews = (listingId) => (state) => {
  const listingReviews = Object.values(state.reviews).filter(
    (review) => review.listingId === listingId
  );
  return listingReviews;
};

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    reviews,
  };
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

const reviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...newState, ...action.reviews};
    default:
      return state;
  }
};

export default reviewsReducer;