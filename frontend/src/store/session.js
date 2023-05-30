import csrfFetch from "./csrf";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

const storeCSRFToken = res => {
  const csrfToken = res.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

export const login = (user) => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (res.ok) {
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
  }
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return res;
};

export const restoreSession = () => async dispatch => {
  const res = await csrfFetch("/api/session");
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return res;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default sessionReducer;