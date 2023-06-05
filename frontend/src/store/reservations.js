const RECEIVE_RESERVATION = "reservation/receiveReservation";
const RECEIVE_RESERVATIONS = "reservation/receiveReservations";

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

const reservationReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation;
      return newState;
    case RECEIVE_RESERVATIONS:
      return { ...newState, ...action.reservations };
    default:
      return state;
  }
};

export default reservationReducer;
