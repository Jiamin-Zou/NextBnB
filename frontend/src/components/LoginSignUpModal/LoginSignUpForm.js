import { useEffect, useRef, useState } from "react";
import { verifyEmailFormat } from "../../util/util.js";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/ModalContext.js";

const LoginSignUpForm = ({
  formType,
  email,
  setEmail,
  handleDemoLogin,
  user,
}) => {
  const { setToggleForm, setToggleModal } = useModal();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  const signUp = formType === "Sign Up";
  const header = signUp ? "Finish signing up" : " Log in";
  const buttonTxt = signUp ? "Agree and continue" : "Log in";

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

  const [mousePositions, setMousePositions] = useState({
    logbtn: { x: 0, y: 0 },
    demo: { x: 0, y: 0 },
  });

  const handleMouseMove = (event, element) => {
    const rect = event.target.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((event.clientY - rect.top) / rect.height) * 100;

    setMousePositions((prevMousePositions) => ({
      ...prevMousePositions,
      [element]: { x: mouseX, y: mouseY },
    }));
  };

  const func = signUp ? sessionActions.signup : sessionActions.login;

  const handleSwitch = (e) => {
    e.preventDefault();
    setToggleForm(false);
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailInput, fnameInput, lnameInput, submitCheck;
    const passwordInput = document.querySelector(".password-form");
    passwordInput.classList.remove("error");
    setPasswordError("");
    const fnameCheck = fName.length > 0;
    const lnameCheck = lName.length > 0;
    const emailCheck = verifyEmailFormat(email);
    const passwordCheck = password.length >= 8;
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
      setBEErrors([]);

      user.firstName = fName;
      user.lastName = lName;
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
          setEmailTag(true);
          setEmailError(data.errors[0]);
          emailInput.classList.add("error");
        } else if (data) setBEErrors([data]);
        else setBEErrors([res.statusText]);
      });
    } else {
      if (!fnameCheck && signUp) {
        setFNameTag(true);
        setFNameError("First name is required.");
        fnameInput.classList.add("error");
      }

      if (!lnameCheck && signUp) {
        setLNameTag(true);
        setLNameError("Last name is required.");
        lnameInput.classList.add("error");
      }

      if (email === "") {
        setEmailTag(true);
        setEmailError("Email is required.");
        emailInput.classList.add("error");
      } else if (!emailCheck && signUp) {
        setEmailTag(true);
        setEmailError("Enter a valid email.");
        emailInput.classList.add("error");
      }

      if (password === "") {
        setPasswordTag(true);
        setPasswordError("Password is required.");
        passwordInput.classList.add("error");
      } else if (!passwordCheck) {
        setPasswordTag(true);
        setPasswordError(
          "Your password must be at lease 8 characters. Please try again."
        );
        passwordInput.classList.add("error");
      }
    }
  };

  const refTwo = useRef(null);

  const handleOutsideClick = (e) => {
    if (refTwo.current && !refTwo.current.contains(e.target)) {
      setToggleForm(false);
      setToggleModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
  if (currentUser) {
    setToggleForm(false);
    setToggleModal(false);
  }
  }, [currentUser, setToggleModal])

  return (
    <div className="modal-content-form" ref={refTwo}>
      <div className="modal-header">
        <button
          onClick={() => {
            setToggleForm(false);
          }}
          id="back-btn"
        >
          <div>&lt;</div>
        </button>
        <div>{header}</div>
        <div></div>
      </div>

      <div className="modal-body">
        {!signUp && (
          <div className="form-header">
            <i className="fa-solid fa-circle-user fa-2xl"></i>
            <div className="welcome-msg">
              <h2>Welcome back, {userName}!</h2>
              <p>{user.email}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="second-form">
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
                  />
                </div>
              </div>
              <div className="err-msg-container">
                {fNameError && (
                  <li className="fname error err-msg">
                    <i className="fa-solid fa-circle-info"></i> {fNameError}
                  </li>
                )}
                {lNameError && (
                  <li className="lname error err-msg">
                    <i className="fa-solid fa-circle-info"></i> {lNameError}
                  </li>
                )}
              </div>
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
                />
              </div>
              <div className="err-msg-container">
                {emailError && (
                  <li className="email error err-msg">
                    <i className="fa-solid fa-circle-info"></i> {emailError}
                  </li>
                )}
              </div>
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
              />
            </div>
            <div className="err-msg-container">
              {passwordError && (
                <li className="password error err-msg">
                  <i className="fa-solid fa-circle-info"></i> {passwordError}
                </li>
              )}
            </div>
          </div>
          {backendErrors.length > 0 && (
            <ul className="err-msg-container">
              {backendErrors.map((error) => (
                <li key={error} className="error err-msg">
                  <i className="fa-solid fa-circle-info"></i> {error}
                </li>
              ))}
            </ul>
          )}
          <button
            id="sign-log-btn"
            type="submit"
            style={{
              backgroundPosition: `calc((100 - ${mousePositions.logbtn.x}) * 1%) calc((100 - ${mousePositions.logbtn.y}) * 1%)`,
            }}
            onMouseMove={(e) => handleMouseMove(e, "logbtn")}
          >
            {buttonTxt}
          </button>

          <button
            id="demo-login-btn"
            onClick={handleDemoLogin}
            style={{
              backgroundPosition: `calc((100 - ${mousePositions.demo.x}) * 1%) calc((100 - ${mousePositions.demo.y}) * 1%)`,
            }}
            onMouseMove={(e) => handleMouseMove(e, "demo")}
          >
            Demo Login
          </button>
        </form>
      </div>
      {!signUp && (
        <div className="not-you">
          Not You?{" "}
          <span className="switch-acc" onClick={handleSwitch}>
            Use another account
          </span>
        </div>
      )}
      {signUp && (
        <div className="not-you">
          Already have an account?{" "}
          <span className="switch-acc" onClick={handleSwitch}>
            Login
          </span>
        </div>
      )}
    </div>
  );
};

export default LoginSignUpForm;
