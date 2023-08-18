import { Route, Switch } from "react-router-dom";
import LoginSignUpModal from "./components/LoginSignUpModal";
import NavBar from "./components/NavBar";
import ListingIndexPage from "./components/ListingIndexPage/Index";
import ListingShowPage from "./components/ListingShowPage";
import Footer from "./components/Footer";
import { useModal } from "./context/ModalContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageNotFound from "./util/PageNotFound";
import TripsIndex from "./components/Trips";

import ReactGA from "react-ga";
const MEASUREMENT_ID = "G-9R1L195QZJ"; // YOUR_MEASUREMENT_ID
ReactGA.initialize(MEASUREMENT_ID);

function App() {
  const { toggleModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);

  return (
    <div className="app">
      <NavBar />
      {toggleModal && <LoginSignUpModal />}
      <Switch>
        <Route path="/" exact>
          <ListingIndexPage />
        </Route>
        <Route path="/listings/:listingId" exact>
          <ListingShowPage />
        </Route>
        <Route path="/category/:category" exact>
          <ListingIndexPage />
        </Route>
        <Route path="/user/trips" exact>
          <TripsIndex />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
