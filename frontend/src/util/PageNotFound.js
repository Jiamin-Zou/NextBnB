import notFound from "../assets/images/404_Airbnb.gif";
import "./PageNotFound.css";
import { useEffect } from "react";

const PageNotFound = () => {

  useEffect(() => {
    document.title = `NextBnB | 404 - Not Found`;
  }, []);

  return (
    <div className="error-page">
      <main className="error-container">
        <div className="error-msg">
          <h1>404</h1>
          <div className="error-list">
            <h2>Page Not Found</h2>
          </div>
        </div>
        <div className="error-img">
          <img src={notFound} alt="404-not-found" />
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
