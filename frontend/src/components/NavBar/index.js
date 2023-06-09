import "./NavBar.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import Logo from "../../assets/images/nextbnb_logo.png";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory()
  const [dropdown, setDropdown] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  return (
    <div className="nav-bar">
      <Link to="/" className="home-link">
        <img src={Logo} className="logo" alt="logo" />
      </Link>
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
          <Link
            to={{ pathname: "https://wellfound.com/u/jiamin-zou-1" }}
            target="_blank"
          >
            <i className="fa-brands fa-angellist"></i>
          </Link>
        </div>
        <div className="dropdown">
          <div
            className="profile-dropdown"
            onClick={() => setDropdown((prevState) => !prevState)}
            ref={profileDropdownRef}
          >
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-circle-user"></i>
          </div>
          {dropdown && <ProfileButton setDropdown={setDropdown} />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
