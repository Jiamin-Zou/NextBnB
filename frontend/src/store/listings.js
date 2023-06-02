import csrfFetch from "./csrf";
import { receiveHost } from "./hosts";

const SET_LISTINGS = "listings/setListings";
const SET_LISTING = "listings/setListing";

// POJO Action creators
export const setListings = (listings) => {
  return {
    type: SET_LISTINGS,
    listings,
  };
};

export const setListing = (listing) => {
  return {
    type: SET_LISTING,
    listing,
  };
};

// Thunk Action creators
export const fetchListings = () => async (dispatch) => {
  const res = await csrfFetch("/api/listings");

  if (res.ok) {
    const data = await res.json();
    dispatch(setListings(data));
  } else {
    throw res;
  }
  return res;
};

export const fetchListing = (listingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/listings/${listingId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setListing(data.listing));
    dispatch(receiveHost(data.host))
  } else {
    throw res;
  }
  return res;
};

// Listings Reducer
const listingsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };

  switch (action.type) {
    case SET_LISTINGS:
      return { ...newState, ...action.listings };
    case SET_LISTING:
      newState[action.listing.id] = action.listing;
      return newState;
    default:
      return state;
  }
};

export default listingsReducer