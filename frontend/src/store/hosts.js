const RECEIVE_HOST = "host/receiveHost";

export const receiveHost = (host) => {
  return {
    type: RECEIVE_HOST,
    host,
  };
};

const hostReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_HOST:
      return {...newState, ...action.host}
    default:
      return state;
  }
};

export default hostReducer;
