import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
import "./ReviewForm.css"

const ReviewForm = () => {
  const { setToggleReviewModal, tripData, setTripData } = useModal();
  const dispatch = useDispatch();
  const header = !!tripData.reviewData.id ? "Update Review" : "Write a new Review"

  const handleClose = (e) => {
    e.preventDefault();
    setTripData(null);
    setToggleReviewModal(false);
  };
  console.log(tripData)
  return (
    <div className="review-modal-bg">
      <div className="review-modal-wrapper">
        <div className="review-modal-head">
          <button onClick={handleClose} id="close-btn">
            <div>X</div>
          </button>
          <div className="review-modal-title">{header}</div>
          <div></div>
        </div>
        <div className="review-modal-container">ReviewForm</div>
      </div>
    </div>
  );
};

export default ReviewForm;
