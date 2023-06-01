import { useState } from "react";
import "./LoginSignUpModal.css";
import LoginSignUpForm from "./LoginSignUpForm";
import { accountExist, demoUser, verifyEmailFormat } from "../../util/util.js";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/ModalContext";

const LoginSignUpModal = () => {
  const { setToggleModal, toggleForm, setToggleForm } = useModal();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);
  const [email, setEmail] = useState("");
  const [formType, setFormType] = useState("");
  const [emailTag, setEmailTag] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [user, setUser] = useState(null);

  const [mousePositions, setMousePositions] = useState({
    continue: { x: 0, y: 0 },
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

  if (currentUser) {
    setToggleModal(false);
    // return <Redirect to="/" />;
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
      setEmailTag(true);
      setEmailError("Invalid Email Format");
      emailInput.classList.add("error");
    }
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login(demoUser));
  };

  return (
    <div className="modal-bg">
      {!toggleForm && (
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={closeModal} id="close-btn">
              <div>X</div>
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
                <li className="email error err-msg">
                  <i className="fa-solid fa-circle-info"></i> {emailError}
                </li>
              )}
              <button
                id="continue-btn"
                type="submit"
                style={{
                  backgroundPosition: `calc((100 - ${mousePositions.continue.x}) * 1%) calc((100 - ${mousePositions.continue.y}) * 1%)`,
                }}
                onMouseMove={(e) => handleMouseMove(e, "continue")}
              >
                Continue
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
        </div>
      )}
      {toggleForm && (
        <LoginSignUpForm
          formType={formType}
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
