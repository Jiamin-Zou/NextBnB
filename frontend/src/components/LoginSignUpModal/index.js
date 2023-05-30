import { useState } from "react";
import "./LoginSignUpModal.css";
import LoginSignUpForm from "./LoginSignUpForm";
import { accountExist, demoUser, verifyEmailFormat } from "../../util/util.js";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const LoginSignUpModal = ({ setToggleModal }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser);
  const [email, setEmail] = useState("");
  const [formType, setFormType] = useState("");
  const [emailTag, setEmailTag] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [emailError, setEmailError] = useState("");

  if (currentUser) return <Redirect to="/" />;

  const handleContinue = async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector(".email-form");
    emailInput.classList.remove("error");
    setEmailError("");
    if (verifyEmailFormat(email)) {
      try {
        const userExists = await accountExist(email);
        if (userExists) {
          setFormType("Log In");
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
    dispatch(sessionActions.login(demoUser))
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
                  required
                />
              </div>
              {emailError && <li className="email error">{emailError}</li>}
            </div>
            <button id="continue-btn" onClick={handleContinue}>
              Continue
            </button>

            <button id="demo-login-btn" onClick={handleDemoLogin}>
              Demo Login
            </button>
          </div>
        </div>
      )}
      {toggleForm && (
        <LoginSignUpForm
          formType={formType}
          setToggleModal={setToggleModal}
          setToggleForm={setToggleForm}
          email={email}
          setEmail={setEmail}
        />
      )}
    </div>
  );
};

export default LoginSignUpModal;
