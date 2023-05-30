import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const NavBar = ({ setToggleModal }) => {
const [dropdown, setDropdown] = useState(false);

  return (
    <div className="nav-bar">
      <h2 className="logo">LOGO IMG</h2>
      <div className="header-links">
        <div className="personal-links">
          <Link
            to={{ pathname: "https://www.linkedin.com/in/jiaminzou95/" }}
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link
            to={{ pathname: "https://github.com/Jiamin-Zou/NextBnB" }}
            target="_blank"
          >
            <i className="fa-brands fa-square-github"></i>
          </Link>
        </div>
        <div className="dropdown">
          <div
            className="profile-dropdown"
            onClick={() => setDropdown((prevState) => !prevState)}
          >
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-circle-user"></i>
          </div>
          {dropdown && <ProfileButton setDropdown={setDropdown} setToggleModal={setToggleModal}/>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
