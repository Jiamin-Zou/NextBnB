import csrfFetch from "./csrf";

const RECEIVE_RESERVATION = "reservation/receiveReservation";
const RECEIVE_RESERVATIONS = "reservation/receiveReservations";
const REMOVE_RESERVATION = "reservation/removeReservations";

export const receiveReservation = (reservation) => {
  return {
    type: RECEIVE_RESERVATION,
    reservation,
  };
};

export const receiveReservations = (reservations) => {
  return {
    type: RECEIVE_RESERVATIONS,
    reservations,
  };
};

export const removeReservation = (reservationId) => {
  return {
    type: REMOVE_RESERVATION,
    reservationId,
  };
};

export const createReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/listings/${reservation.listingId}/reservations`,
    {
      method: "POST",
      body: JSON.stringify({reservation: reservation}),
    }
  );
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReservation(data.reservation));
  } else {
    throw res;
  }

  return res;
};

export const updateReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PATCH",
    body: JSON.stringify({reservation: reservation}),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReservation(data.reservation));
  } else {
    throw res;
  }

  return res;
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReservation(reservationId));
  } else {
    throw res;
  }

  return res;
};

const reservationReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation;
      return newState;
    case RECEIVE_RESERVATIONS:
      return { ...newState, ...action.reservations };
    case REMOVE_RESERVATION:
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
};

export default reservationReducer;
