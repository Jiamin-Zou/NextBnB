import notFound from "../assets/images/404_Airbnb.gif";
import "./PageNotFound.css";

const PageNotFound = ({ errors }) => {
  debugger
  return (
    <div className="error-page">
      <main className="error-container">
        <div className="error-msg">
          <h1>404</h1>
          <ul className="error-list">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
        <div className="error-img">
          <img src={notFound} alt="404-not-found" />
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
