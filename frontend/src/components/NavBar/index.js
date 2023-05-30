import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

const NavBar = ({setToggleModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);
  

  const handleClick = () => {
    setToggleModal(true)
  };

  const handleLogout = () => {
    dispatch(sessionActions.logout())
  };

  return (
    <div>
      <h1>LOGO IMG</h1>
      {!currentUser && (
        <button onClick={handleClick} className="login-sign">
          Login or Sign Up
        </button>
      )}
      {currentUser && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default NavBar;
