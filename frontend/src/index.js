import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/reset.css";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import csrfFetch from "./store/csrf";
import * as sessionActions from "./store/session";
import * as listingActions from "./store/listings";
import ModalProvider from "./context/ModalContext";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.listingActions = listingActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
