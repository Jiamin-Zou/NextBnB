import { useState } from "react";
import "./LoginSignUpModal.css";
import LoginSignUpForm from "./LoginSignUpForm";
import { accountExist, demoUser, verifyEmailFormat } from "../../util/util.js";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const LoginSignUpModal = ({ setToggleModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);
  const [email, setEmail] = useState("");
  const [formType, setFormType] = useState("");
  const [emailTag, setEmailTag] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [user, setUser] = useState(null);

  if (currentUser) {
    setToggleModal(false);
    return <Redirect to="/" />;
  }

  const handleContinue = async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector(".email-form");
    emailInput.classList.remove("error");
    setEmailError("");
    if (verifyEmailFormat(email)) {
      try {
        const data = await accountExist(email);
        const userExists = data.user_found;
        if (userExists) {
          setFormType("Log In");
          setUser(data.user);
        } else {
          setFormType("Sign Up");
        }
      } catch (error) {
        throw error;
      } finally {
        setToggleForm(true);
      }
    } else {
      setEmailError("Invalid Email Format");
      emailInput.classList.add("error");
    }
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  const handleDemoLogin = (e) => {
    e.preventDefault()
    dispatch(sessionActions.login(demoUser));
  };

  return (
    <div className="modal-bg">
      {!toggleForm && (
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={closeModal} id="close-btn">
              X
            </button>
            <div>Log in or sign Up</div>
            <div></div>
          </div>

          <div className="modal-body">
            <div>
              <h3>Welcome to NextBnB</h3>
            </div>
            <form onSubmit={handleContinue} className="first-form">
              <div className="email-form">
                {emailTag && <div className="email-tag">Email</div>}
                <input
                  className="email-input"
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => setEmailTag(true)}
                  onBlur={(e) => setEmailTag(false)}
                />
              </div>
              {emailError && (
                <li className="email error">
                  <i className="fa-solid fa-circle-info"></i> {emailError}
                </li>
              )}
              <button id="continue-btn" type="submit">
                Continue
              </button>
              <button id="demo-login-btn" onClick={handleDemoLogin}>
                Demo Login
              </button>
            </form>
          </div>
        </div>
      )}
      {toggleForm && (
        <LoginSignUpForm
          formType={formType}
          setToggleForm={setToggleForm}
          email={email}
          setEmail={setEmail}
          handleDemoLogin={handleDemoLogin}
          user={user}
        />
      )}
    </div>
  );
};

export default LoginSignUpModal;
