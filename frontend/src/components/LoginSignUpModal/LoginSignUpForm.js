import { useState } from "react";
import { verifyEmailFormat } from "../../util/util.js";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const LoginSignUpForm = ({
  formType,
  setToggleForm,
  email,
  setEmail,
  handleDemoLogin,
  user,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  const signUp = formType === "Sign Up";
  const header = signUp ? "Finish signing up" : " Login";
  const buttonTxt = signUp ? "Sign Up" : "Login";
  let userName;
  if (user && !signUp) {
    const first = user.first_name;
    const last = user.last_name;

    userName =
      first[0].toUpperCase() +
      first.slice(1) +
      " " +
      last[0].toUpperCase() +
      last.slice(1);
  }
  const [emailTag, setEmailTag] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTag, setPasswordTag] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [fName, setFName] = useState("");
  const [fNameTag, setFNameTag] = useState(false);
  const [fNameError, setFNameError] = useState("");
  const [lName, setLName] = useState("");
  const [lNameTag, setLNameTag] = useState(false);
  const [lNameError, setLNameError] = useState("");
  const [backendErrors, setBEErrors] = useState([]);

  if (currentUser) return <Redirect to="/" />;
  const func = signUp ? sessionActions.signup : sessionActions.login;

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailInput, fnameInput, lnameInput, submitCheck;
    const passwordInput = document.querySelector(".password-form");
    passwordInput.classList.remove("error");
    setPasswordError("");
    const fnameCheck = fName.length > 0;
    const lnameCheck = lName.length > 0;
    const emailCheck = verifyEmailFormat(email);
    const passwordCheck = password.length >= 6;
    submitCheck = emailCheck && passwordCheck;

    const user = { email, password };

    if (signUp) {
      submitCheck = fnameCheck && lnameCheck && emailCheck && passwordCheck;
      emailInput = document.querySelector(".email-form");
      fnameInput = document.querySelector(".fname-form");
      lnameInput = document.querySelector(".lname-form");
      emailInput.classList.remove("error");
      fnameInput.classList.remove("error");
      lnameInput.classList.remove("error");
      setEmailError("");
      setFNameError("");
      setLNameError("");

      user.first_name = fName;
      user.last_name = lName;
    }

    if (submitCheck) {
      return dispatch(func(user)).catch(async (res) => {
        if (res.ok) {
          setToggleForm(false);
        }
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          setBEErrors(data.errors);
          passwordInput.classList.add("error");
        } else if (data) setBEErrors([data]);
        else setBEErrors([res.statusText]);
      });
    } else {
      if (!fnameCheck && signUp) {
        setFNameError("First Name cannot be blank");
        fnameInput.classList.add("error");
      }

      if (!lnameCheck && signUp) {
        setLNameError("Last Name cannot be blank");
        lnameInput.classList.add("error");
      }
      if (!passwordCheck) {
        setPasswordError("Password cannot be less than 6 characters");
        passwordInput.classList.add("error");
      }
    }
  };

  return (
    <div className="modal-content-form">
      <div className="modal-header">
        <button
          onClick={() => {
            setToggleForm(false);
          }}
          id="close-btn"
        >
          &lt;
        </button>
        <div>{header}</div>
        <div></div>
      </div>

      <div className="modal-body">
        {!signUp && <h2>Welcome back {userName}</h2>}
        {signUp && (
          <div className="name-form">
            <div className="fname-container">
              <div className="fname-form">
                {fNameTag && <div className="fname-tag">First Name</div>}
                <input
                  className="fname-input"
                  type="text"
                  value={fName}
                  placeholder="First Name"
                  onChange={(e) => setFName(e.target.value)}
                  onFocus={(e) => setFNameTag(true)}
                  onBlur={(e) => setFNameTag(false)}
                  required
                />
              </div>
            </div>

            <div className="lname-container">
              <div className="lname-form">
                {lNameTag && <div className="lname-tag">Last Name</div>}
                <input
                  className="lname-input"
                  type="text"
                  value={lName}
                  placeholder="Last Name"
                  onChange={(e) => setLName(e.target.value)}
                  onFocus={(e) => setLNameTag(true)}
                  onBlur={(e) => setLNameTag(false)}
                  required
                />
              </div>
            </div>

            {fNameError && (
              <li className="fname error">
                <i className="fa-solid fa-circle-info"></i> {fNameError}
              </li>
            )}
            {lNameError && (
              <li className="lname error">
                <i className="fa-solid fa-circle-info"></i> {lNameError}
              </li>
            )}
          </div>
        )}

        {signUp && (
          <div className="email-container">
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
            {emailError && (
              <li className="email error">
                <i className="fa-solid fa-circle-info"></i> {emailError}
              </li>
            )}
          </div>
        )}

        <div className="password-container">
          <div className="password-form">
            {passwordTag && <div className="password-tag">Password</div>}
            <input
              className="password-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setPasswordTag(true)}
              onBlur={(e) => setPasswordTag(false)}
              required
            />
          </div>
          {passwordError && (
            <li className="password error">
              <i className="fa-solid fa-circle-info"></i> {passwordError}
            </li>
          )}
        </div>

        <ul>
          {backendErrors.map((error) => (
            <li key={error} className="error">
              <i className="fa-solid fa-circle-info"></i> {error}
            </li>
          ))}
        </ul>
        <button id="sign-log-btn" onClick={handleSubmit}>
          {buttonTxt}
        </button>

        <button id="demo-login-btn" onClick={handleDemoLogin}>
          Demo Login
        </button>
      </div>
    </div>
  );
};

export default LoginSignUpForm;
