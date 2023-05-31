import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
const ProfileButton = ({ setDropdown }) => {
  const {setToggleModal} = useModal()
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);
  const history = useHistory()

  const handleClick = () => {
    setToggleModal(true);
    setDropdown(false)
  };

  const handleLogout = () => {
    setDropdown(false)
    dispatch(sessionActions.logout());
    history.push("/")
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
