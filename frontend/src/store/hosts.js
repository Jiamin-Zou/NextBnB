const RECEIVE_HOST = "host/receiveHost";
const RECEIVE_HOSTS = "host/receiveHosts";

export const receiveHost = (host) => {
  return {
    type: RECEIVE_HOST,
    host,
  };
};

export const receiveHosts = (hosts) => {
  return {
    type: RECEIVE_HOSTS,
    hosts,
  };
};

const hostReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_HOST:
      newState[action.host.id] = action.host;
      return newState;
    case RECEIVE_HOSTS:
      return { ...newState, ...action.hosts };
    default:
      return state;
  }
};

export default hostReducer;
