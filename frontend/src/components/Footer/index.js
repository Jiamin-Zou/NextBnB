import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <span>&copy; 2023 NextBnB</span>
        <span><span>
        <span className="separator">&#x2022;</span>
            </span></span>

        <div className="social-links">
          <li>
            <Link
              to={{ pathname: "https://www.linkedin.com/in/jiaminzou95/" }}
              target="_blank"
            >
              LinkedIn
            </Link>
          </li>
            <span className="separator">&#x2022;</span>
          <li>
            <Link
              to={{ pathname: "https://github.com/Jiamin-Zou/NextBnB" }}
              target="_blank"
            >
              GitHub
            </Link>
          </li>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
