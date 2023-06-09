const RECEIVE_REVIEWS = "reviews/receiveReviews";

export const getReviews = (listingId) => (state) => {
  const listing = state.session.listings[listingId];

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
