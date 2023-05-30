const NavBar = ({ toggleModal, setToggleModal }) => {
  const handleClick = () => {
    setToggleModal(true);
  };
  return (
    <div>
      <h1>LOGO IMG</h1>
      <button onClick={handleClick} className="login-sign">
        Login or Sign Up
      </button>
    </div>
  );
};

export default NavBar;
