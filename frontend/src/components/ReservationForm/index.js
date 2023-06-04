import { useModal } from "../../context/ModalContext";
import { useSelector } from "react-redux";
import Calender from "../Calender";

const Reservation = () => {
  const { setToggleModal } = useModal();
  const currentUser = useSelector((state) => state.session.currentUser);
  return (
    <>
      <div>Status: {currentUser ? "Logged in" : "Not Logged in"}</div>
      {!currentUser && (
        <div>
          <div>Please Login to make a reservation</div>
          <button onClick={() => setToggleModal(true)}>Login/Signup</button>
        </div>
      )}
      {currentUser && (
        <div>
          <h2>Reservation Component</h2>
          <Calender />
        </div>
      )}
    </>
  );
};

export default Reservation;
