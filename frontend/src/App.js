import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginSignUpModal from "./components/LoginSignUpModal";
import NavBar from "./components/NavBar";
import ListingIndexPage from "./components/ListingIndexPage/Index";
import ListingShowPage from "./components/ListingShowPage";
import Footer from "./components/Footer";
import { useModal } from "./context/ModalContext";

function App() {
  const {toggleModal} = useModal();
  return (
    <div className="app">
        <NavBar />
        {toggleModal && <LoginSignUpModal />}
        <Switch>
          <Route path="/" exact>
            <ListingIndexPage />
          </Route>
          <Route path="/listings/:listingId">
            <ListingShowPage/>
          </Route>
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
