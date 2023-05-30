import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
const ProfileButton = ({ setToggleModal, setDropdown }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  const handleClick = () => {
    setToggleModal(true);
    setDropdown(false)
  };

  const handleLogout = () => {
    setDropdown(false)
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (currentUser) {
    sessionLinks = (
      <div className="user-drop-down">
        <h2>Hi!</h2>
        <p className="user-name">{currentUser.firstName} {currentUser.lastName}</p>
        <p>{currentUser.email}</p>
        <button onClick={handleLogout} className="log-btn">
          Logout
        </button>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-drop-down">
        <h2>Welcome,</h2>
        <button onClick={handleClick} className="log-btn">
          Log In
        </button>
        <button onClick={handleClick} className="log-btn">
          Sign Up
        </button>
      </div>
    );
  }

  return <div className="dropdown-content">{sessionLinks}</div>;
};

export default ProfileButton;
