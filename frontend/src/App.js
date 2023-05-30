import { useState } from "react";
import LoginSignUpModal from "./components/LoginSignUpModal";
import NavBar from "./components/NavBar";

function App() {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <div className="app">
      <NavBar setToggleModal={setToggleModal} />
      {toggleModal && <LoginSignUpModal setToggleModal={setToggleModal} />}
    </div>
  );
}

export default App;
