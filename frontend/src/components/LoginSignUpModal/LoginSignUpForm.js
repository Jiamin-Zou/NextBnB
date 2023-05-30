const LoginSignUpForm = ({
  formType,
  setToggleModal,
  setToggleForm,
  email,
  setEmail,
}) => {
  const signUp = formType === "Sign Up";
  const header = signUp ? "Finish signing up" : " Login"

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button onClick={() => {setToggleForm(false)}} id="close-btn">
          &lt;
        </button>
        <div>Log in or sign Up</div>
        <div></div>
      </div>
    </div>
  );
};

export default LoginSignUpForm;
