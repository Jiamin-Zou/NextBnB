import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginSignUpModal from "./components/LoginSignUpModal";
import NavBar from "./components/NavBar";
import ListingIndexPage from "./components/ListingIndexPage/Index";

function App() {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <div className="app">
      <NavBar setToggleModal={setToggleModal} />
      {toggleModal && <LoginSignUpModal setToggleModal={setToggleModal} />}
      <Switch>
        <Route path="/" exact>
          <ListingIndexPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
